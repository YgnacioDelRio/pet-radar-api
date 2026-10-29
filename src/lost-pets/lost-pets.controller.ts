import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { CreateLostPetDto } from './dtos/create-lost-pet.dto';
import { generateLostPetTemplate } from 'src/lost-pets/templates/lost-pet-template';
import { LostPetsService } from './lost-pets.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { StorageService } from 'src/storage/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('lost-pets')
export class LostPetsController {
    constructor(
        private emailService:EmailService, 
        private lostPetService: LostPetsService,
        private storageService: StorageService
    ){}

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith('image/'))
    }))
    async createIncident(
        @Body() createLostPetDto: CreateLostPetDto,
        @UploadedFile() file: any
    ){
        const url = await this.storageService.uploadFile(file,"pets");
        const template = generateLostPetTemplate(createLostPetDto, url);
        await this.emailService.sendEmail(template);
        const lostPet = await this.lostPetService.createLostPet(createLostPetDto, url);
        return lostPet;
    }

    @Get()
    async getAllPets(){
        const pets = await this.lostPetService.findAllPets();
        return pets;
    }

    @Post(":id/image")
    @UseInterceptors(FileInterceptor('image', {
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith('image/'))
    }))
    async uploadSingleFile(
        @Param('id',ParseIntPipe) id: number,
        @UploadedFile() file: any
    ){
        const url = await this.storageService.uploadFile(file,'pets');
        return{
            url: url
        };
    }
}

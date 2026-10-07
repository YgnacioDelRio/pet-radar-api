import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { CreateLostPetDto } from './dtos/create-lost-pet.dto';
import { generateLostPetTemplate } from 'src/lost-pets/templates/lost-pet-template';
import { LostPetsService } from './lost-pets.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('lost-pets')
export class LostPetsController {
    constructor(private emailService:EmailService, private lostPetService: LostPetsService){}

    @Post()
    async createIncident(
        @Body() createLostPetDto: CreateLostPetDto
    ){
        const template = generateLostPetTemplate(createLostPetDto);
        await this.emailService.sendEmail(template);
        const lostPet = await this.lostPetService.createLostPet(createLostPetDto);
        return lostPet;
    }

    @Get()
    async getAllPets(){
        const pets = await this.lostPetService.findAllPets();
        return pets;
    }
}

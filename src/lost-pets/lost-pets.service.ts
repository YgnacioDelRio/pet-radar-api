import { Injectable } from '@nestjs/common';
import { CreateLostPetDto } from './dtos/create-lost-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from './entities/lost-pets.entity';
import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class LostPetsService {

    constructor(
        @InjectRepository(LostPet)
        private lostPetRepository : Repository<LostPet>,
        private cacheService: CacheService
    ){}

    async findAllPets(){
        const cachePets = await this.cacheService.get("lost-pets:all");
        if(cachePets){
            return cachePets;
        }
        const pets = await this.lostPetRepository.find();
        await this.cacheService.set("lost-pets:all",pets);
        return pets;
    }

    async createLostPet(dto: CreateLostPetDto){
        const lostPet = this.lostPetRepository.create({
            type: dto.type,
            name: dto.name,
            phone: dto.phone,
            race: dto.race,
            age: dto.age,
            color: dto.color,
            ownerName: dto.ownerName,
            location: {
                type: 'Point',
                coordinates: [dto.lon,dto.lat]
            }
        });
        return await this.lostPetRepository.save(lostPet);
    }
}

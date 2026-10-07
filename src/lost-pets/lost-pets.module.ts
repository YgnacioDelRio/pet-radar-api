import { Module } from '@nestjs/common';
import { LostPetsController } from './lost-pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LostPet } from './entities/lost-pets.entity';
import { EmailModule } from 'src/email/email.module';
import { LostPetsService } from './lost-pets.service';
import { CacheModule } from 'src/cache/cache.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([LostPet]), CacheModule, AuthModule],
  providers: [LostPetsService],
  controllers: [LostPetsController],  
})
export class LostPetsModule {}

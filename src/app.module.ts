import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LostPetsModule } from './lost-pets/lost-pets.module';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [LostPetsModule, EmailModule, TypeOrmModule.forRoot(dataSourceOptions), UsersModule, AuthModule, CacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

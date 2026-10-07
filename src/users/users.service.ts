import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/system-user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
    ){}

    // HASH CODIGO SHA 256 secret123
    // JTW id, email, rol, expiracion

    async create(dto:CreateUserDto): Promise<number>{
        const exists = await this.userRepository.findOneBy({email:dto.email});
        if(exists) throw new ConflictException("El email ya esta registrado");
        const hashedPassword = await bcrypt.hash(dto.password,10);
        const user = this.userRepository.create({
            name: dto.name,
            lastName: dto.lastName,
            email: dto.email,
            password: hashedPassword,
            isPetAlertEnabled: dto.isPetAlertEnabled,
            radius: dto.radius,
            location:{
                type: 'Point',
                coordinates:[dto.lon,dto.lat]
            }
        });
        const saved = await this.userRepository.save(user);
        return saved.id;
    }

    async validate(email: string, password:string): Promise<number | null>{
        const exists = await this.userRepository.findOneBy({email :email})
        if(!exists) return null;

        const isValid = await bcrypt.compare(password, exists.password);

        if(!isValid) return null;

        return exists.id;
    }

}

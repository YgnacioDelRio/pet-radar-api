import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private tokenService: TokenService
    ){}

    async register(dto:CreateUserDto){
        const id = await this.usersService.create(dto);
        const token = await this.tokenService.generate(id);
        return token;
    }

    async login(dto:LoginDto){
        const id = await this.usersService.validate(dto.email,dto.password)
        if(!id) throw new BadRequestException("El email o la contraseña no es valido");
        const token = await this.tokenService.generate(id);
        return token;
    }

}

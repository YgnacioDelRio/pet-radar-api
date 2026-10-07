import { Injectable, UnauthorizedException } from '@nestjs/common';
import{JwtService} from '@nestjs/jwt'

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService
    ){}

    async generate(userId: number) : Promise<string>{
        const token = this.jwtService.signAsync({id: userId, rol: 'Administrador'});
        return token;
    }

    async getUserId(token:string){
        try{
            const payload = await this.jwtService.verifyAsync(token);
            return payload.id;
        }catch(error){
            throw new UnauthorizedException("Token invalido");
        }
    }
}

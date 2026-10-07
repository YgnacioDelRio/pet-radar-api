import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService
  ){}

  async canActivate(
    context: ExecutionContext
  ) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace("Bearer ","");
    if(!token){throw new UnauthorizedException("Falta el token")};
    console.log(token);
    const userId = await this.tokenService.getUserId(token);
    return true;
  }
}

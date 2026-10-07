import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { envs } from 'src/config/envs';

@Injectable()
export class CacheService {
    private readonly redis = new Redis({
        host: envs.REDIS_HOST,
        port: envs.REDIS_PORT
    });

    async set(key:string, value:any){
        const valueInString = JSON.stringify(value);
        await this.redis.set(key,valueInString);
    }

    async get(key:string){
        const value = await this.redis.get(key);
        return value;
    }
}

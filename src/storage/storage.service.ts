import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
    private readonly s3Client = new S3Client({region: 'us-east-1'})
    

    async uploadFile(file:any, folder:string){
        const filePath = `${folder}/${randomUUID()}`;
        const bucket = 'pet-radar-images-s3';
        const region = 'us-east-1';
        

        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: filePath,
                Body: file.buffer,
                ContentType: file.mimetype
            })
        );
        // es una interpretacion del link de la primera imagen subida
        //https://pet-radar-images-s3.s3.us-east-1.amazonaws.com/pets/17543033-1bb7-4631-b6c8-6c481de62ca8
        const url = `https://${bucket}.s3.${region}.amazonaws.com/${filePath}`
        return url;
    }
}

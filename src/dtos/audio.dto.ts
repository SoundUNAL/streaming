import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Express } from 'express';

export class CreateAudioDTO {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @Type(() => String)
  readonly audio: Express.Multer.File;
}
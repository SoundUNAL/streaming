import { Module } from '@nestjs/common';
import { AppController } from '../routes/app.controller';
import { AppService } from '../dtos/app.service';
import { MongooseModule } from '@nestjs/mongoose'
import {dataBaseConection } from '../shared/constanst'

@Module({
  imports: [MongooseModule.forRoot(dataBaseConection)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

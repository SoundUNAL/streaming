import { Module } from '@nestjs/common';
import { AudioModule } from './audios.module'
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { dataBaseConection } from '../shared/constanst';

@Module({
  imports: 
  [
    MongooseModule.forRoot(dataBaseConection), AudioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

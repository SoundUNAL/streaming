import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AudioController } from '../controllers/audios.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { dataBaseConection } from '../shared/constanst';

@Module({
  imports: 
  [
    MongooseModule.forRoot(dataBaseConection)
  ],
  controllers: [AppController, AudioController],
  providers: [AppService],
})

export class AppModule {}

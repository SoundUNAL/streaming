import { Module } from '@nestjs/common';
import { AudioService } from '../services/audios.inventario';
import { TrackService } from '../services/audios.manager';
import { AudioController } from '../controllers/audios.controller';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { AudioSchema } from '../schemas/audio';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Audio', schema: AudioSchema}])],
  providers: [AudioService, TrackService],
  controllers: [AudioController]
})
export class AudioModule {}
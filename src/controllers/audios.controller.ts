import { Controller, Post, Res, HttpStatus, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAudioDTO } from '../dtos/audio.dto';
import { TrackService } from '../services/audios.manager';

@Controller('audio')
export class AudioController {

  @Post('upload')
  @UseInterceptors(FileInterceptor('audio'))
  async uploadAudio(@Res() res, @UploadedFile() audio: Express.Multer.File, @Body() body: CreateAudioDTO) {
    console.log(audio);
    console.log(body.id);

    try {
      // Llama a la función uploadTrack del servicio TrackService
      const trackService = new TrackService()
      const audioId = await trackService.uploadTrack(body, audio);
      
      res.status(HttpStatus.OK).json({
        message: 'Audio uploaded successfully',
        audioId: audioId,
        filename: audio.originalname,
      });
      
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to upload audio',
        error: error.message,
      });
    }
  }
}
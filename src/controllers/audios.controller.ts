import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAudioDTO } from '../dtos/audio.dto';
import { TrackService } from '../services/audios.manager';
import { AudioService } from '../services/audios.inventario'

@Controller('audio')
export class AudioController {

    constructor(private audioService: AudioService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('audio'))
    async uploadAudio(@Res() res, @UploadedFile() audio: Express.Multer.File, @Body() body: {}) {

        try {
          
            const trackService = new TrackService()
            const audioId = await trackService.uploadTrack(audio);
            let createAudioDTO = new CreateAudioDTO();
            
            createAudioDTO.name = audio.originalname
            createAudioDTO.id = audioId
            
            console.log(createAudioDTO)

            this.audioService.createAudio(createAudioDTO)

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

    // Get Products /product
    // @Get('/list')
    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.audioService.getAudios();
        return res.status(HttpStatus.OK).json(products);
    }

    // GET single product: /product/5c9d46100e2e5c44c444b2d1
    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.audioService.getAudio(productID);
        if (!product) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json(product);
    }


}   
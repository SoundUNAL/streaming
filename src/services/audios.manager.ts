import { Injectable } from '@nestjs/common';
import { GridFSBucket, Db, MongoClient } from 'mongodb';
import { Readable } from 'stream';
import { CreateAudioDTO } from '../dtos/audio.dto';
import multer from 'multer';

@Injectable()
export class TrackService {
  private bucket: GridFSBucket;

  async getBucker() {
    this.bucket = new GridFSBucket(await this.getConnection(), {
        bucketName: 'tracks',
    });
  }

  async getConnection(): Promise<Db> {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('audios');
    return db;
  }
  
  async uploadTrack(audio: Express.Multer.File): Promise<string> {
    
    await this.getBucker()

    return new Promise<string>((resolve, reject) => {

    if (!this.bucket) {
        return reject(new Error('No bucket'));
    };


    if (!audio || !audio.buffer) {
        return reject(new Error('No audio file uploaded'));
    }

    let trackName = audio.filename;
    const readableTrackStream = new Readable();
    
    readableTrackStream.push(audio.buffer);
    readableTrackStream.push(null);

    let uploadStream = this.bucket.openUploadStream(trackName);
    var id = uploadStream.id;
    
    readableTrackStream.pipe(uploadStream);
    readableTrackStream.pipe(uploadStream);
    
    uploadStream.once('error', (error) => {
      reject(error);
    });

    uploadStream.once('finish', () => {
      resolve(id.toString());
    
    });
    });
  }
}
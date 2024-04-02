import { Injectable } from '@nestjs/common';
import { GridFSBucket, Db, MongoClient, ObjectId } from 'mongodb';
import { Readable } from 'stream';
import { CreateAudioDTO } from '../dtos/audio.dto';
import multer from 'multer';

@Injectable()
export class TrackService {
  private bucket: GridFSBucket;

  async getBucket() {
    this.bucket = new GridFSBucket(await this.getConnection(), {
        bucketName: 'tracks',
    });
  }

  async getConnection(): Promise<Db> {
    const client = await MongoClient.connect('mongodb://localhost:27019');
    const db = client.db('audios');
    return db;
  }
  
  async uploadTrack(audio: Express.Multer.File): Promise<string> {
    
    await this.getBucket()

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

  async getTrack(trackID: string, res: any): Promise<void> {
    let trackObjectId;
    try {
      trackObjectId = new ObjectId(trackID);
    } catch (error) {
      return res.status(400).json({ message: "Invalid track in URL parameter." });
    }

    res.set("content-type", "audio/mp3");
    res.set("accept-ranges", "bytes");
    await this.getBucket();

    //console.log(this.bucket.find(trackObjectId))
    const downloadStream = this.bucket.openDownloadStream(trackObjectId);

    console.log(downloadStream)
    
    downloadStream.on('data', chunk => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
        return res.status(400).json({ message: "La cancion no existe." });
    });

    downloadStream.on('end', () => {
      res.end();
    });
  }
  
}
import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Audio } from "../interfaces/audios.interface";
import { CreateAudioDTO } from "../dtos/audio.dto";

@Injectable()
export class AudioService {

    constructor(@InjectModel('Audio') private readonly AudioModel: Model<Audio>) {}

    // Get all Audios
    async getAudios(): Promise<Audio[]> {
        const Audios = await this.AudioModel.find();
        return Audios;
    }
    
    // Get a single Audio
    async getAudio(AudioID: string): Promise<Audio> {
        const Audio = await this.AudioModel.findById(AudioID); 
        return Audio;
    }

    // Post a single Audio
    async createAudio(createAudioDTO: CreateAudioDTO): Promise<Audio> {
        const newAudio = new this.AudioModel(createAudioDTO);
        return newAudio.save();
    }

    // Delete Audio
    async deleteAudio(AudioID: string): Promise<any> {
        const deletedAudio = await this.AudioModel.findByIdAndUpdate(AudioID);
        return deletedAudio;
    }

    // Put a single Audio
    async updateAudio(AudioID: string, createAudioDTO: CreateAudioDTO): Promise<Audio> {
        const updatedAudio = await this.AudioModel
                            .findByIdAndUpdate(AudioID, createAudioDTO, {new: true});
        return updatedAudio;
    }

}
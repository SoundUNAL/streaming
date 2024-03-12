import { Document } from "mongoose";

export interface Audio extends Document {
    readonly name: string;
    readonly id: string;
    readonly createdAt: Date;
}
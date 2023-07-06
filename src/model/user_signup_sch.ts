import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
const currentDate: Date = new Date();
const options: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Kolkata', timeZoneName: 'short' };
const dateIST: string = currentDate.toLocaleString('en-US', options);
export interface User extends Document {
  name: string;
  phno: number;
  email?: string | null;
  password: string;
  verify:boolean;
  createdAt:string;
  role:string

}

export const userSchema: Schema<User> = new Schema<User>({
  name: {
    required: true,
    type: String,
  },
  phno: {
    required: true,
    type: Number,
    unique:true,
    immutable: true,
  },
  email: {
    type: String,
    unique:true,
    immutable: true,
    sparse: true,
  },
  password: {
    required: true,
    type: String,
  },
  verify: {
    required: true,
    type: Boolean,
    default:false
  },
  createdAt: { 
    type: String,  
    default: dateIST
  },
  role:{
    type:String,
    default:'user'
  }

},{ 
  versionKey: false 
});




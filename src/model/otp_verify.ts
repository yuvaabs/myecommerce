import { Schema, Document,ObjectId } from 'mongoose';

export interface Otp extends Document {
  userid:ObjectId
  name: string;
  phno: number;
  email?:string;
  otp:number;
  createdAt:Date;

}

export const otpverify: Schema<Otp> = new Schema<Otp>({
  userid:{
    required:true,
    type:Schema.Types.ObjectId,
  },
  name: {
    required: true,
    type: String,
  },
  phno: {
    required: true,
    type: Number,
    unique:true
  },
  email: {
    type: String
  },
  otp:{
    required:true,
    type:Number,
    
  },
  createdAt: { 
    type: Date, 
    expires: '2m', 
    default: Date.now 
  }
},
  { 
    versionKey: false 
  }
);



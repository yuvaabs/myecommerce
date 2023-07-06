import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

export interface Address extends Document {
    country:String; 
    fullname:String; phno:Number; houseno:Number; area:String; landmark:String; pincode:Number; 
    city:String; state:String; makedefault:Boolean 

}

export const addressSchema: Schema<Address> = new Schema<Address>({
  country: {
    required: true,
    type: String,
  },
  fullname: {
    required: true,
    type: String,
    
  },
  phno: {
    type: Number,
  },
  houseno: {
    required: true,
    type: Number,
  },
  area: {
    required: true,
    type: String,
  },
  landmark: { 
    required: true,
    type: String
  },
  pincode: { 
    required: true,
    type: Number
  },
  city: { 
    required: true,
    type: String
  },
  state: { 
    required: true,
    type: String
  },
  makedefault: { 
    required: true,
    type: Boolean
  }

},{ 
  versionKey: false 
});




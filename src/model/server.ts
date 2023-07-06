import mongoose from 'mongoose';
import {userSchema,User} from './user_signup_sch';
import {otpverify,Otp} from './otp_verify';
import { addressSchema,Address } from './addressschema';
import { produsch,prodtype } from './product_sch';
import { imgtype,imgsch} from './imagesch';



import dotenv from 'dotenv';

dotenv.config();

const dburl: string = process.env.DB_URL || '';

mongoose
  .connect(dburl)
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => console.error(err));


const usermodel = mongoose.model<User>('userdetail', userSchema);
const otpmodel = mongoose.model<Otp>('otpverify', otpverify);
const addressmodel = mongoose.model<Address>('addressdetail', addressSchema);
const productmodel = mongoose.model<prodtype>('product', produsch);
const imagemodel = mongoose.model<imgtype>('productimage', imgsch);




export default {usermodel,otpmodel,addressmodel,productmodel,imagemodel};



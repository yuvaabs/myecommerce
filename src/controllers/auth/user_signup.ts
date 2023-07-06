import { Request,Response } from "express";
import model from "../../model/server";
import bcrypt from 'bcrypt'
import {otpverify,Otp} from "../../model/otp_verify";
import {userSchema,User} from "../../model/user_signup_sch";
import {ObjectId} from "mongoose";
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretkey: string = process.env.JWT_SECRET_KEY || '';

const deleteAfterDelay=(id:ObjectId,delay:number)=>{
setTimeout(async()=>{
  const user:User | null=await model.usermodel.findById(id).exec();
  if(user && !user.verify){
    await model.usermodel.findByIdAndDelete(id);
    console.log(`User with ID ${id} deleted.`);
  }
},delay)

}

export const user_signup = async (req: Request, res: Response): Promise<any>=> {
  try {
    const { name, phno, email, password }: {
      name: string,
      phno: number,
      email: string,
      password: string
    } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const existingPhoneNumber: User | null = await model.usermodel.findOne({ phno}).exec();
    console.log(existingPhoneNumber)
    console.log('existing data');

if (existingPhoneNumber && existingPhoneNumber.verify === true) {
  console.log("user already exist")
  return res.status(409).json({ error: 'User already exists' });

}
   
    const data = new model.usermodel({
      name,
      phno,
      email,
      password:hashedPassword
    });

    const savedUser = await data.save();
    const{_id}=savedUser;
    const millisecond=2*60*1000
    deleteAfterDelay(_id,millisecond);
    console.log(savedUser);
    console.log('datasaved');

   
    const otpData = {
      userid: savedUser._id,
      name: savedUser.name,
      phno: savedUser.phno,
      email: savedUser.email,
      otp: Math.floor(1000 + Math.random() * 9000)
    };
    const verify=new model.otpmodel(otpData)
    await verify.save()
    
    console.log('otp generated')
     return res.status(200).send('User signup successful');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred during user signup' });
  }
};



export const demo= async (req: Request, res: Response): Promise<any> =>{
  res.json({message:"hi"})
}


 
export const verify_otp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { otp }: { otp: number} = req.body;
    
    const phno=parseInt(req.params.phno)

    // Find the OTP data for the given userId and OTP value
    const otpData: Otp | null = await model.otpmodel.findOne({ phno: phno, otp }).exec();
    if (!otpData) {
      console.log('Invalid OTP');
      res.status(404).json({ error: 'Invalid OTP' });
      return;
    }
    await model.otpmodel.deleteOne({ phno: phno, otp })
    // Update the user's verification status to true
    await model.usermodel.updateOne({ phno: phno }, { verify: true }).exec();
    const token = jwt.sign({ _id: otpData.userid }, secretkey);
    console.log('success otp verifed');
    return res.status(200).json({ token:token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred during OTP verification' });
  }
};




export const signin_otp = async (req: Request, res: Response): Promise<any> => {
  try {
    
    
    const phno: number=parseInt(req.params.phno)

    // Find the OTP data for the given userId and OTP value
    const data: User | null = await model.usermodel.findOne({ phno: phno, verify:true }).exec();
    if (!data) {
      console.log('user not found');
      res.status(404).json({ error: 'user not found' });
      return;
    }
    const otpData = {
      userid: data._id,
      name: data.name,
      phno: data.phno,
      email: data.email,
      otp: Math.floor(1000 + Math.random() * 9000)
    };
    const verify=new model.otpmodel(otpData)
    await verify.save()
    // Update the user's verification status to true
   
    console.log('otp created for verified account');
    return res.status(200).json({ message:"otp created for verified account" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred during OTP creation' });
  }
};





export const signin_verify_otp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { otp }: { otp: number} = req.body;
    
    const phno=parseInt(req.params.phno)

    // Find the OTP data for the given userId and OTP value
    const otpData: Otp | null = await model.otpmodel.findOne({ phno: phno, otp }).exec();
    if (!otpData) {
      console.log('Invalid OTP');
      res.status(404).json({ error: 'Invalid OTP' });
      return;
    }
    await model.otpmodel.deleteOne({ phno: phno, otp })
    // Update the user's verification status to true
    
    console.log('signin in success');
    return res.status(200).json({ message:
    'otp verified' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred during signin OTP verification' });
  }
};






export const signin = async (req: Request, res: Response): Promise<any> => {
  const { identifier, password }: { identifier: any; password: string } = req.body;
 
  try {
    const type:any=typeof identifier
    // Find the user by email or phone number
    console.log(type)
    
    let query: any;
    const identy=parseInt(identifier)

if (identy) {
  query = { phno: identifier, verify: true };
  
} else {
  query = { email: identifier, verify: true };
}

console.log(identifier);
console.log(password);

const user: User | null = await model.usermodel.findOne(query);
    
   

    if (!user) {
      console.log("user not found")
      res.status(404).json({ error: 'User not found' });
      return;
    }
    console.log(user);

    // Compare the provided password with the stored hashed password
    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password")
      res.status(401).json({ error: 'Invalid password' });
      return;
    }
    const token = jwt.sign({ _id: user._id }, secretkey);
    console.log("signin successfully")
    // Handle successful sign-in
    return res.status(200).json({ jwt: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'An error occurred during sign-in' });
  }
};



export const forgotpass = async (req: Request, res: Response): Promise<any> => {
  const { identifier, password,newpassword}: { identifier: string; password: string; newpassword:string; } = req.body;

  try {
    // Find the user by email or phone number
    const user: User| null = await model.usermodel.findOne({
      $or: [{ email: identifier }, { phno: identifier }],verify:true
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newpassword, salt)
    await model.usermodel.updateOne({
      $or: [{ email: identifier }, { phno: identifier }]
    },{$set:{password:newpassword}})
    // Handle successful sign-in
    return res.status(200).json({ message: 'Password changed' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'An error occurred during changing password' });
  }
};




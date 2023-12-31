import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import model from '../model/server';
import dotenv from 'dotenv';
import { User } from '../model/user_signup_sch';

dotenv.config();
const secretkey: string = process.env.JWT_SECRET_KEY || '';



export const authenticate = async (req:Request, res: Response, next: NextFunction) => {

  try{
  const token: string | undefined = req.headers.authorization?.split(' ')[1]; // Extract the token from the "Authorization" header
   console.log(token)
   console.log('----------')
   

  if (!token) {
    console.log("No token provided")
    return res.status(401).json({ error: 'No token provided' });
    
  }
  

  const data:any=jwt.verify(token, secretkey)
  console.log(data)
  const verify:User | null=await model.usermodel.findOne({_id:data._id,verify:true,role:'user'})

  if(verify){
    
    next()
  }
  else{
    console.log("error to autheticate")
  }
}
catch(err){
  console.log(err)
  return res.status(500).send("network error")
}

  
};

import { Request,Response } from "express";
import model from "../model/server";
import {ObjectId} from "mongoose";
import { addressSchema,Address } from "../model/addressschema";

export const add_address = async (req: Request, res: Response): Promise<any>=> {
    try {
      const { country, fullname, phno,houseno,area,landmark,pincode, 
        city,state,makedefault}: {
        country:string; 
    fullname:string; phno:number; houseno:number; area:string; landmark:string; pincode:number; 
    city:string; state:string; makedefault:boolean 
      } = req.body;
    
     
      const data = new model.addressmodel({
        country, fullname, phno,houseno,area,landmark,pincode, 
        city,state,makedefault
      });
  
      const savedUser = await data.save();
      
      console.log(savedUser);
      console.log('address datasaved');

    
       return res.status(200).send('User address successful saved');
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'An error occurred during storing address' });
    }
  };
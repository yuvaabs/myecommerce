import { Request,Response } from "express";
import model from "../model/server";
import multer from 'multer'
import { ObjectId } from "mongodb";
import path from 'path';
import fs from 'fs';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const upload = multer({ storage: storage });
export const add_product = async (req: Request, res: Response): Promise<any>=> {
    try {

    


      const { productname, imageid, price,description }: {
        productname: string,
        imageid:ObjectId,
        price: number,
        description:string
      } = req.body;
      


     
      const data = new model.productmodel({
        productname,
        imageid,
        price,
        description
      });
  
      const savedproduct = await data.save();
      console.log(savedproduct);
      console.log('product datasaved');
  
     

      
       return res.status(200).send('product added successfully');
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'An error occurred during adding product ' });
    }
  };

  export const add_image = async (req: Request, res: Response): Promise<any> => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }
      
      const imageData = fs.readFileSync(req.file.path);
  
      // Create a new image document
      const newImage = new model.imagemodel({
        filename: req.file.originalname,
        image: imageData
      });
  
      // Save the image document to the database
      await newImage.save();
  
      // Remove the temporary file
      
  
      console.log('Image data saved');
  
      return res.status(200).send('Image saved successfully');
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'An error occurred during adding the image' });
    }
  };
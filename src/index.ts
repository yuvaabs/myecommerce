import express, { Request, Response } from 'express';
import userrouter from './routes/user';
import productroute from './routes/productRoute';

import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import cors from 'cors';

dotenv.config();
const app = express();

const port: number | undefined = process.env.PORT ? parseInt(process.env.PORT, 10) : undefined;
app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())
app.use(userrouter);
app.use(productroute);


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

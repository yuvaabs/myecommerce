import { Router,Request,Response } from 'express'
import { authenticate } from '../middleware/jwtauth';
import { add_image, add_product,upload} from '../controllers/addproduct';

const productroute = Router();

productroute.post('/addproduct',add_product);
productroute.post('/addimage',upload.single('image'), add_image);








export default productroute;
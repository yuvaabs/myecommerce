import {user_signup,demo,verify_otp,signin,forgotpass,signin_otp,signin_verify_otp} from '../controllers/auth/user_signup'
import { Router,Request,Response } from 'express'
import { add_address } from '../controllers/address';
import { authenticate } from '../middleware/jwtauth';

const userrouter = Router();

userrouter.post('/usersignup', user_signup);
userrouter.post('/verify-otp/:phno', verify_otp);
userrouter.post('/usersignin',authenticate,signin );
userrouter.post('/userforgotpass',forgotpass);
userrouter.post('/useraddress',add_address);
userrouter.get('/signin_otp/:phno',signin_otp);
userrouter.post('/verify_signin_otp/:phno',signin_verify_otp);







userrouter.get('/demo', demo); 

export default userrouter;
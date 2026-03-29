import express from 'express';
import cookieParser from 'cookie-parser';
import {ENV} from './src/config/env.js'
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/DB.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send("APP is READY")
})
app.listen(ENV.PORT,()=>{
    console.log(`Server is running on port http://localhost:${ENV.PORT}`);
    connectDB()
})

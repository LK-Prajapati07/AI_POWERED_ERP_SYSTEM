import mongoose from 'mongoose'
import {ENV} from './env.js'
export const connectDB=async () =>{
    try {
        await mongoose.connect(ENV.DB)
        console.log("Conneted to database")
        
    } catch (error) {
        console.log("Error Occure In connect DataBase")
    }
}
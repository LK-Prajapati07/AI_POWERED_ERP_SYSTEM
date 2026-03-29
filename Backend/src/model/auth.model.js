import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    firebaseUID:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
         match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']

    },
    avater:{
        type:String,
    },
    role:{
        type:String,
        enum:['student','teacher','admin'],
        default:'student'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    

},
{
    timestamps:true
}
)
export const userModel = mongoose.model("User", userSchema);
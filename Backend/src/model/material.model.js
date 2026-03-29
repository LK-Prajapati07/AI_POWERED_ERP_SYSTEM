import mongoose from "mongoose";
const materialSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    fileUrl:{
        type:String,
        required:true
    },
    fileType:{
        type:String,
        required:true,
        enum:['pdf','doc','video']
    },
    subject:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    semester:{
        type:Number
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    tags:{
        type:Array
    },
    visibility:{
        type:String,
        enum:['public','private','course_based'],
        default:'public'
    },
    isDeleted:{
        type:Boolean,
        default:false
     
    }
},
{timestamps:true}
)
export const materialModel=mongoose.model('Material',materialSchema)
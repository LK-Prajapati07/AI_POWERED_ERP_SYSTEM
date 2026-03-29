import mongoose from "mongoose";
const contestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
problems: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem"
  }
],
  duration:{
    type:Number,
    max:1440,
    min:1,
    required:true
    
  },
 status: {
  type: String,
  enum: ["upcoming", "active", "ended"],
  default: "upcoming"
},
  participants: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
],
  maxScore:{
    type:Number,
    min:1,
    required:true
  },
  visibility:{
    type:String,
    enum:['public','private'],
    default:'private'
  },
  isDeleted:{
    type:Boolean,
    default:false
  },
  leaderboard: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    score: Number,
    rank: Number
  }
]

},
    {timestamps:true}

);
export const contest=mongoose.model('Contest',contestSchema)
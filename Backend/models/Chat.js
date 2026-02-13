import mongoose from "mongoose";

const ChatScehma=new mongoose.Schema({
    sessionId:String,
    messages:[
        {
            role:String,
            content:String,
            createdAt:{type:Date, default:Date.now}
        }
    ]
})

export default mongoose.model("Chat",ChatScehma)
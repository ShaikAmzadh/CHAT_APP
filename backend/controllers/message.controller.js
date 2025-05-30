import Conversation from '../models/Conversation.model.js'
import Message from '../models/message.model.js'
import { getReceiverSocketId } from '../socket/socket.js'
import {io} from '../socket/socket.js'

export const sendMessage=async (req,res)=>{
    try {
        const {id:receiverId}=req.params
        const {message}=req.body

        const senderId=req.user._id

        let conversation=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })


        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage=new Message({
            senderId,
            receiverId,
            message
        })

        await Promise.all([newMessage.save(),conversation.save()])
        conversation.messages.push(newMessage._id)
        // SOCKET IO FUNCIONALITY
        const receiverSocketId=getReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        // Multiple await statements at once

 

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller",error.message);
        
        res.status(500).json({error:"Internal server error"})
    }
}

export const getMessages=async (req,res)=>{
    try {
       const {id:userToChatId}=req.params
       
       const senderId=req.user._id
        // Use .populate() when your schema has references to other collections and you want to fetch related data in one query.
       const conversation=await Conversation.findOne({
        participants:{$all:[senderId,userToChatId]}
       }).populate("messages")

       if(!conversation) {
        res.status(200).json([])
        return
       }
        
       const messages=conversation.messages
       res.status(200).json(messages)

    } catch (error) {
        console.log("Error in getMessages controller",error.message);
        
        res.status(500).json({error:"Internal server error"})
    }
}
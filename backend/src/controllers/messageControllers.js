import { messageModel } from "../models/message-model.js";
import userModel from "../models/user-model.js";
import cloudinary from "cloudinary";

export const getUsers = async (req, res)=>{
    try {
        const users = await userModel.find({_id: {$ne:req.user._id}}).select("-password");
        if(!users){
            return res.status(400).json({messgae: "No users found"});
        }

        res.status(200).json(users);
    } catch (error) {
        console.log("Message Route (users) error " + error);
        return res.status(500).json({messgae: "Internal Server issue"});
    }
}

export const getMessages = async(req, res) =>{
    try {
        const {id:recieverId} = req.params;
        const senderId =  req.user._id
        const messages = await messageModel.find({
            $or:[
                {senderId, recieverId},
                {senderId: recieverId, recieverId:senderId}
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Message Route (messages) error " + error);
        return res.status(500).json({messgae: "Internal Server issue"});
    }
}

export const sendMessage = async (req, res)=>{
    try {
        const {image, text} = req.body;
        const senderId = req.user._id;
        const {id:receiverId} = req.params.id;

        let imageUrl;
        if(image){
            const uploadRes = await cloudinary.uploader.upload(image);
            imageUrl = uploadRes.secure_url;
        }

        const message = await new messageModel.create({
            senderId,
            receiverId,
            text,
            image
        });

        await message.save();
        res.status(200).json(message);

        // todo: real-time functionality using socket.io

    } catch (error) {
        console.log("Message Route (Sendmessages) error " + error);
        return res.status(500).json({messgae: "Internal Server issue"});
    }
}
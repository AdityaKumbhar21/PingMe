import { generateToken } from "../lib/utils.js";
import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";



export const signup = async (req, res)=>{
    try {
        const {email, fullname, password} = req.body;
        if(!email || !fullname || !password){
            return res.status(401).json({ messgae: "All fields are required"});
        }
        if(password.length <6){
            return res.status(401).json({ messgae: "Password should be 6 characters"});
        }
        
        const user = await userModel.findOne({email});
         
        if(!user){
            console.log("inside if");
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const createdUser = new userModel({
                fullname, 
                email,
                password: hashedPassword
            });

            if(createdUser){
                generateToken(createdUser._id, res);
                await createdUser.save();

                res.status(201).json({
                    id: createdUser._id,
                    fullname: createdUser.fullname,
                    email: createdUser.email,
                    profilePic: createdUser.profilePic
                });
            }
            else{
                res.status(400).json({message: "Invalid user data"});
            }
        }

        else{
            res.status(400).json({message: "Email already exists"});
        }
    } catch (error) {
        console.log("Signup error: " + error);
        res.status(500).json({messgae: "Internal Server Error"});
    }
}

export const login = async (req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email});
        if(user){
            const match = await bcrypt.compare(password, user.password);

            if(match){
                generateToken(user._id, res);
                res.status(201).json({success: "Login Successful"});
            }
            else{
                res.status(400).json({error: "Incorrect Password"});
            }
        }
        else{
            res.status(400).json({error:"Invalid Credentials"})
        }

    } catch (error) {
        console.log("Login error: " + error);
        res.status(500).json({messgae: "Internal Server Error"});
    }
}

export const logout = (req, res)=>{
   try {
     res.cookie('token',"");
     res.status(201).json({success:"Successfully Logged out"});
   } catch (error) {
    console.log("Logout error: " + error);
    res.status(500).json({messgae: "Internal Server Error"});
   }
}


export const updateProfile = async (req, res)=>{
    const {profilePic} = req.body;
    try {
        if(!profilePic){
           return res.status(400).json({error: "Profile pic required"});
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await findByIdAndUpdate(req.user._id, {profilePic: cloudinaryResponse.secure_url}, {new:true});
        res.status(200).json(updatedUser);
        
    } catch (error) {
        console.log("Upadte profile pic Error: " + error);
        res.status(500).json({error: "Internal  server error"});
    }
}


export const checkAuth = (req, res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("CheckAuth Error: " + error);
        res.status(500).json({error: "Internal  server error"});
    }
}
import jwt from "jsonwebtoken";
import userModel from "../models/user-model.js"


export const isLoggedIn = async (req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(token){
            const decoded = jwt.verify(token, process.env.JWT_KEY)

            if(!decoded){
                return res.status(400).json({error: "Invalid Token"});
            }
            
            const user = await userModel.findById(decoded.userId).select("-password");
            
            if(!user){
                return res.status(404).json({error: "User  not found"});
            }

            req.user = user;
            next();
        }

        else{
            res.status(400).json({error: "Unauthorized access"});
        }
    } catch (error) {
        console.log("Middleware Error: " + error);
        res.status(500).json({error: "Internal  server error"});
    }
}
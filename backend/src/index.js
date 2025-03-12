import express from "express";
import authRoutes from "./routes/authRouter.js"
const app = express();

app.use('/auth', authRoutes)

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
    
});
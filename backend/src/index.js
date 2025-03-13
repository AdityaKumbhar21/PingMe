import express from "express";
import authRoutes from "./routes/authRouter.js"
import messageRoutes from "./routes/messageRouter.js"
import dotenv from "dotenv";
import { dbConnection } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use('/auth', authRoutes);
app.use('/message', messageRoutes);

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server  running on port ${port}`);
    dbConnection();
});
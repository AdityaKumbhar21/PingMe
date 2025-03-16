import express from "express";
import authRoutes from "./routes/authRouter.js"
import messageRoutes from "./routes/messageRouter.js"
import dotenv from "dotenv";
import { dbConnection } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { app, server } from "./lib/socket.js";
dotenv.config();

app.use(express.json({"limit":"50mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

const __dirname = path.resolve();

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname,"../frontend", "dist","index.html"))
    })
}

const port = process.env.PORT;

server.listen(port, ()=>{
    console.log(`Server  running on port ${port}`);
    dbConnection();
});
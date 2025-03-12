import express from "express";
import authRoutes from "./routes/authRouter.js"
import dotenv from "dotenv";
import { dbConnection } from "./lib/db.js";



const app = express();
app.use('/auth', authRoutes)

dotenv.config();
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server  running on port ${port}`);
    dbConnection();
});
import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB successfully connected: ${conn.connection.host}`);
    } 
    catch (error) {
        console.log(`MongoDB error: ${error}`); 
    }
}
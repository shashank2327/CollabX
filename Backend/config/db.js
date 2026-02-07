import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected to DB");
        });

        // /ecommerce is the database name
        await mongoose.connect(`${process.env.MONGO_URI}/collegeCollab`);
        
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}
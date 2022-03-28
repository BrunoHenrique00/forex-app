import mongoose from "mongoose";
import '../models/Users'

async function getMongoClient(){
    await mongoose.connect(process.env.MONGODB_URL!)
    console.log("Connected to MongoDB")
}

export = getMongoClient
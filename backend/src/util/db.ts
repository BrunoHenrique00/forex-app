import mongoose from "mongoose";
import '../models/Users'
import '../models/Trades'

async function getMongoClient(url: string){
    await mongoose.connect(url)
    console.log("Connected to MongoDB")
}

export = getMongoClient
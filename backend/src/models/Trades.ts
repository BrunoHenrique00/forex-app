import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userId: String,
    amount: Number,
    usdPrice: Number,
    date: {
        type: Date,
        default: Date.now
    }
})

export = mongoose.model('users' , UserSchema)
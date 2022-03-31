import mongoose from "mongoose";
const Schema = mongoose.Schema

const tradeSchema = new Schema({
    userId: String,
    amount: Number,
    usdPrice: Number,
    date: {
        type: Date,
        default: Date.now
    }
})

export = mongoose.model('trades' , tradeSchema)
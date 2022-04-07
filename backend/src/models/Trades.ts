import mongoose from "mongoose";
const Schema = mongoose.Schema

const tradeSchema = new Schema({
    userId: String,
    amount: Number,
    price: Number,
    date: {
        type: Date,
        default: Date.now
    },
    originalCurrency: String
})

export = mongoose.model('trades' , tradeSchema)
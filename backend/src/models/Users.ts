import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String
    }
})

export = mongoose.model('users' , UserSchema)
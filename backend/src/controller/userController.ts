import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
const User = mongoose.model('users')

type UserProps = {
    email: string
    _id: string
}

const checkIfUserExists = (req: Request , res: Response , next: NextFunction) => {
    const errorAlreadyExists = "User already exists"
    const { email , userId } = req.body

    if(userId){
        User.findById(userId , (err ,user: UserProps) => {
            if(user){
                return next()
            }
            return res.status(404).json({
                err: errorAlreadyExists
            })
        })
        return 
    }

    User.find({ email: email } , (err, user) => {
        if(!user[0]){
            return next()
        }

        return res.status(404).json({
            err: errorAlreadyExists
        })
    })
}

export = {
    checkIfUserExists
}
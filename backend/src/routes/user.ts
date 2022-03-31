import express from 'express';
import mongoose from 'mongoose';
import userController from '../controller/userController';
const router = express.Router();
const User = mongoose.model('users')
type UserProps = {
    email: string
    _id: string
}

router.post('/user/login' , (req , res , next ) => {
    const { email , userId } = req.body

    if(userId){
        User.findById(userId , (err: mongoose.CallbackError, user: UserProps) => {
            if(user){
                return res.json({
                    user
                })
            }
            return res.status(404).json({
                err: 'User not found!'
            })
        })
        return 
    }

    User.find({ email } , (err, [user]) => {
        if(user){
            return res.json({
                user
            })
        }
        return res.status(404).json({
            err: 'User not found!'
        })
    })
})

router.post('/user', userController.checkIfUserExists , async (req , res ) => {
    const { email } = req.body

    const newUser = new User({
        email
    })
    newUser.save((err , user) => {
        if(err){
            res.status(404).send(err)
        }
        res.status(201).send(user)
    })
})

export = router;
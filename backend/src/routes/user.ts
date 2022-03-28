import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
const User = mongoose.model('users')

router.get('/user' , async (req , res ) => {

    User.find({} , (err, users) => {
        res.json({
            users
        })
    })
})

router.post('/user' , async (req , res ) => {
    const { email } = req.body
    const newUser = new User({
        email
    })
    newUser.save((err , user) => {
        if(err){
            res.send(err)
        }
        res.send(user)
    })
})

export = router;
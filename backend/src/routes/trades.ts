import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Trade = mongoose.model('trades')

router.get('/trades/:id' , (req , res) => {
    const userId = req.params.id
    
    Trade.find({ userId }, (err, trades) => {
        if(!err){
            return res.status(200).json({
                trades
            })
        }
        res.status(404).json({
            err: 'User not found!'
        })
    })
})

router.post('/trades' , async (req , res ) => {
    const { userId , amount , price , originalCurrency } = req.body

    const newTrade = new Trade({
        userId,
        amount,
        price,
        originalCurrency
    })
    newTrade.save((err , user) => {
        if(err){
            return res.send(err)
        }
        res.status(201).send(user)
    })
})

export = router;
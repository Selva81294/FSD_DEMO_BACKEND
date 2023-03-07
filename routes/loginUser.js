import express from 'express'
import bcrypt from 'bcrypt'
import { generateAuthToken, User } from '../models/user.js';

const router = express.Router();

router.post("/", async (req,res)=>{
    try {
        //email validation
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).json({message: "Invalid Credentials"})
        
        //password validation
        const validatePassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validatePassword) return res.status(400).json({message: "Invalid Credentials"})

        //token using
        const token =  generateAuthToken(user._id)

        res.status(200).json({message: "Loged in Successfully", token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

export const loginRouter = router
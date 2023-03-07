import express from 'express'
import { Content } from '../models/content.js';

const router = express.Router();

router.get("/", async (req,res)=>{
    try {
        res.status(200).json({message: "working fine"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

export const contentRouter = router
import express from 'express'
import { Content } from '../models/content.js';
import { User } from '../models/user.js';

const router = express.Router();

//get all contents
router.get("/allcontent", async (req,res)=>{
    try {
        const content = await Content.find().populate("user","username")
        if(!content) return res.status(400).json({message:"Could not fetch your data"}) 
        res.status(200).json(content)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

//get all users
router.get("/allusers", async (req,res)=>{
    try {
        const user = await User.find()
        if(!user) return res.status(400).json({message:"Could not fetch your data"}) 
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

//get only users data
router.get("/user",async (req,res)=>{
    try {
        const content = await Content.find({user: req.user._id}).populate("user","username email") 
        if(!content) return res.status(400).json({message:"Could not fetch your data"}) 
        res.status(200).json(content)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})  
    }
})

//add a data
router.post("/", async (req,res)=>{
    try {
        let postDate = new Date().toJSON().slice(0,10)
        const content = await new Content({...req.body, date:postDate, user: req.user._id}).save()
        if(!content) return res.status(400).json({message:"Error posting your content"}) 
        res.status(200).json(content)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

//edit a data
router.put("/edit/:id", async (req,res)=>{
    try {
        const updatedContent = await Content
        .findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
    if(!updatedContent) return res.status(400).json({message: "Error updating your content"})
    res.status(200).json(updatedContent)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"}) 
    }
})

//delete a data
router.delete("/:id", async (req,res)=>{
    try {
        const deleteContent = await Content.findByIdAndDelete({_id:req.params.id})
        if(!deleteContent) return res.status(400).json({message: "Error deleting your content"})
        res.status(200).json({message:"Deleted Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"}) 
    }
})


export const contentRouter = router
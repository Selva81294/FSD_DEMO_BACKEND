import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        username: {
            type : String,
            required : true,
            maxlength : 32,
            trim : true
        },
        email: {
            type : String,
            required : true,
            unique: true,
            trim : true
        },
        password: {
            type : String,
            required : true
        }
    }
)

export const generateAuthToken = (id) =>{
    return jwt.sign({id},process.env.SECERT_KEY)
}

export const User = mongoose.model("user", userSchema);

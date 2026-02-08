import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import validator from 'validator'

const createToken=({id})=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30s'})
}

const loginUser=async(req, res)=>{
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:'User does not exist'})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=createToken(user._id)
            res.cookie('token',token,{
                httpOnly:true,
                maxAge:30*1000
            }).json({success:true,message:'Login successful'})
        }else{
        res.json({success:false,message:'Invalid Credentials'})
    }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const signupUser=async(req,res)=>{
    const {name,email,password} = req.body
    try {
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:'User already exists'})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Enter a valid email'})
        }
        if(password.length < 8){
            return res.json({success:false,message:'Enter a strong password'})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })
        const user=await newUser.save()
        const token=createToken(user._id)
        res.cookie('token',token,{
            httpOnly:true,
            maxAge:30*1000
        }).json({success:true,message:'Signup successful'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const checkLogin=async(req,res)=>{
    const token=req.cookies.token
    if(!token){
        return res.json({loggedIn:false})
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        res.json({loggedIn:true,userId:token_decode.id})
    } catch (error) {
        console.log(error)
        res.json({loggedIn:false,message:error.message})
    }
}

export {loginUser,signupUser,checkLogin}
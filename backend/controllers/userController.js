import dotenv from 'dotenv';
dotenv.config();
import Pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export async function register(req,res){
    try{
        const {username,password}=req.body;
        if(!username || !password){
            return res.status(400).json({message:"Username and password is required"});
        }
        const checkUser=await Pool.query("Select * from users where username=$1",[username]);
        if(checkUser.rows.length>0){
            return res.status(400).json({message:"Username already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await Pool.query("Insert into users (username,password) values ($1,$2) RETURNING *",[username,hashedPassword]);
        const token=jwt.sign({userId:user.rows[0].id},process.env.JWT_SECRET,{expiresIn:'10h'});
        return res.status(201).json({message:"User registered successfully",token});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}
export async function login(req,res){
    try{
        const {username,password}=req.body;
        if(!username || !password){
            return res.status(400).json({message:"Username and password is required"});
        }
        const checkUser=await Pool.query("Select * from users where username=$1",[username]);
        if(checkUser.rows.length==0){
            return res.status(404).json({message:"User not found"});
        }
        const hashedPassword=checkUser.rows[0].password;
        const isPassValid=await bcrypt.compare(password,hashedPassword);
        if(!isPassValid){
            return res.status(401).json({message:"Invalid Password"});
        }
        const token=jwt.sign({userId:checkUser.rows[0].id},process.env.JWT_SECRET,{expiresIn:'10h'});
        return res.status(200).json({message:"Login successful",token});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}
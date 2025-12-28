import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
export async function socketAuth(socket,next){
    try{
        const token=socket.handshake.auth?.token;
        if(!token){
            return res.status(404).json({message:"Token not found"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        socket.user={userId:decoded.userId};
        next();
    }catch(err){
        console.error(err);
        return res.status(401).json({message:"Unauthorized"});
    }
}
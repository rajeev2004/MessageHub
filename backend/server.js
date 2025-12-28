import { timeStamp } from "console";
import express from "express";
import http from "http";
import { Server } from "socket.io";
const rooms={};
const users={};
const messages={};
const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'*'
    }
});
io.on("connection",(socket)=>{
    console.log("connection established",socket.id);
    socket.on("joinRoom",({username,room})=>{
        users[socket.id]={username,room};
        socket.join(room);
        if(messages[room]){
            socket.emit("roomMessages",messages[room]);
        }
        if(!rooms[room]){
            rooms[room]=new Set();
        }
        rooms[room].add(username);
        socket.emit("systemMessage",{Msg:`Welcome ${username}`,timeStamp:new Date()});
        socket.to(room).emit("systemMessage",{Msg:`${username} joined the room`,timeStamp:new Date()});
        if(messages[room]){
            messages[room].push({type:"system",username:"system",text:`${username} joined the room`,timeStamp:new Date()});
        }else{
            messages[room]=[];
            messages[room].push({type:"system",username:"system",text:`${username} joined the room`,timeStamp:new Date()});
        }
        io.to(room).emit("roomUsers",Array.from(rooms[room]));
    })
    socket.on("chatMessage",(message)=>{
        const userProfile=users[socket.id];
        const username=userProfile.username;
        const room=userProfile.room;
        const Msg={message,username};
        io.to(room).emit("chatMessage",({...Msg,timeStamp:new Date()}));
        if(messages[room]){
            messages[room].push({type:"chat",username,text:message,timeStamp:new Date()})
        }else{
            messages[room]=[];
            messages[room].push({username,text:message,timeStamp:new Date()});
        }
    })
    socket.on("typing",(isTyping)=>{
        const user=users[socket.id];
        if(!user){
            return;
        }
        const {username,room}=user;
        socket.to(room).emit("userTyping",{username,isTyping});
    })
    socket.on("disconnect",()=>{
        const userProfile=users[socket.id];
        if(!userProfile){
            console.log("Socket was not in any room",socket.id);
            return;
        }
        const {username,room}=userProfile;
        if(rooms[room]){
            rooms[room].delete(username);
            if(rooms[room].size==0){
                delete rooms[room];
            }else{
                io.to(room).emit("roomUsers",Array.from(rooms[room]));
            }
        }
        socket.to(room).emit("systemMessage",{Msg:`${username} left the room`,timeStamp:new Date()});
        if(messages[room]){
            messages[room].push({type:"system",username:"system",text:`${username} left the room`,timeStamp:new Date()})
        }else{
            messages[room]=[];
            messages[room].push({type:"system",username:"system",text:`${username} left the room`,timeStamp:new Date()});
        }
        delete users[socket.id];
    })
})
server.listen(3000,()=>{
    console.log("server listening on port 3000");
})
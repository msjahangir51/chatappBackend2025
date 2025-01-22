const {Server} = require("socket.io");
const http = require("http");
const express = require("express")

const app = express();

const server = http.createServer(app)


const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        credentials:true
    }
})
const getReceiverSocketId = (userId)=>{
    return userSocketMap[userId]
}
const userSocketMap = {};


io.on("connection", (socket)=>{
    console.log("A user Connected ", socket.id)
    const userId = socket.handshake.query.userId;

    if(userId) userSocketMap[userId] = socket.id;


    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("A user disconnect ", 
            socket.id
        )
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})


module.exports = {io, app,server,express,getReceiverSocketId}
const express = require("express");
const app = express();
const https = require("http").createServer(app);

// These 2 lines are for making localHost ****

const openPort = process.env.openPort || 3000;

https.listen(openPort, () => {
    // We will typr here
    console.log(`your Port is ${openPort} `)
})



//  these lines are used for fetch all linked files like StyleSheet, or javascript file 
//  we must need to declare the path of that

app.use(express.static(__dirname + "/public"));


app.get("/", (ServerRequest, ServerResponse) => {
    ServerResponse.sendFile(__dirname + '/index.html');
})

// Now We are using Socket.io
const io = require('socket.io')(https);


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("messages", (msg) => {
        socket.broadcast.emit("messages", msg);
    })
});
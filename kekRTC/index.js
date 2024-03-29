const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { v4:uuidV4 } = require('uuid');
const path = require('path');

const publicDir = path.join(__dirname, './public');

app.use(express.static(publicDir));
app.set('view engine', 'ejs');

app.get('', (req, res) => {

    res.redirect(`${uuidV4()}`);

})

app.get('/:room', (req, res) => {

    res.render('room', { roomId: req.params.room });

})

io.on('connection', (socket) => {

    socket.on('join-room', (roomId, userId) => {

        console.log(`${userId} joined ${roomId}`);

        socket.join(roomId); //join the room through socket

        //tell everyone except yourself
        socket.broadcast.to(roomId).emit('user-connected', userId); 

        socket.on('disconnect', () => {

            socket.broadcast.to(roomId).emit('user-disconnected', userId);

        })

    })

})

server.listen(3000, (error) => {

    if(error)
    {
        return console.log("Server is not up bruh...");
    }

    console.log("Server is up.");

})
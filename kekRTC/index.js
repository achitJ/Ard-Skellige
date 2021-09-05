const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const { v4: uuidV4 } = require('uuid');

const publicDirPath = path.join(__dirname, './public');

console.log(publicDirPath);

app.use(express.static(publicDirPath));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    res.redirect(`/${uuidV4()}`);

})

app.get('/:room', (req, res) => {

    res.render('room', {roomId: req.params.room});

})

io.on('connection', (socket) => {

    socket.on('join-room', (roomId, userId) => {

        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);

        //we have to disconnect from the server because webRTC takes a bit of time before disconnecting which causes lag before disconnecting
        // socket.on('disconnect', () => {

        //     socket.to(room).broadcast.emit('user-disconnect', userId);

        // })

    })

})

server.listen(3000, () => {

    console.log("Server is up");

});
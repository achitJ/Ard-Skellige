const socket = io('/');
// const videoGrid = document.getElementById('video-grid');

// const myPeer = new Peer(undefined, {
//   host: '/',
//   port: '3030'
// });

// myPeer.on('open', id => {
//     socket.emit('join-room', ROOM_ID, id)
// });

socket.emit('join-room', ROOM_ID, 10);

socket.on('user-connected', (userId) => {

    console.log(userId);

})
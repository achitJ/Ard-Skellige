console.log(ROOM_ID);

const socket = io('/');
const videoGrid = document.getElementById('video-grid');

const myPeer = new Peer(undefined, {
    host: '/',
    port: '3030'
})

const myVideo = document.createElement('video');
myVideo.muted = true;

const peers = {};

myPeer.on('open', (id) => { //create a peer connection

    //tell the backend that the room is ready to be connected
    socket.emit('join-room', ROOM_ID, id);

});

//get the access to the user media
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then((stream) => {

    //add my own video to the screen
    addVideoStream(myVideo, stream);

    //stream our video to the peer server
    socket.on('user-connected', (userId) => {

        setTimeout(connectToNewUser, 1000, userId, stream);

    });

    myPeer.on('call', (call) => {

        call.answer(stream);

        const video = document.createElement('video');

        call.on('stream', (userVideoStream) => {

            addVideoStream(video, userVideoStream);

        })

    });

})

//
function connectToNewUser(userId, stream)
{
    console.log('user-connected');

    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');

    call.on('stream', (userVideoStream) => {

        addVideoStream(video, userVideoStream);

    });

    call.on('close', () => {

        video.remove();

    })

    peers[userId] = call;

    console.log("user-connected-done");
}


socket.on('user-disconnected', (userId) => {

    if(peers[userId]) peers[userId].close();

});

function addVideoStream(video, stream) 
{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {

        video.play();

    });

    videoGrid.append(video);
}
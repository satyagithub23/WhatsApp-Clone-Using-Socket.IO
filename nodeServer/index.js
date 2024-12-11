// Node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
  })



const users = {}


/* 

running a socket.io erver which is an instance of http

the server will listen to the incoming events

socket is a particular connection

io.on means it is an instance of socket.io which will listen socket connections. Like jarvis connected, veronica connected etc. 


socket.on means when anything happens with a particular connection then what action will be taken is handled by the socket.on



*/


io.on('connection', socket => {
    // new-user-joined is a custom event
    socket.on('new-user-joined', name => {
        // write the function to if a socket is sending an user joined event
        //Give socket.id named key to the users which is equal to the name
        users[socket.id] = name

        // broadcast.emit() // will send update that a new user joined to all the other users except the user joined
        socket.broadcast.emit('user-joined',name);
    });

    // function to handle message send event
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
    });

    
})
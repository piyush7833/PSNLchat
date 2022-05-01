// node server which will handle socket io connection 
// 8000 is port
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

// here all events are not pre defined it is randomly or as per use defined by me
io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
      // if any new user joins let other user connect it to the server known
        // console.log("New user" , name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    // if anyone send the message broadcast it to others
    socket.on('send', message=>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });
    // if anyone disconnect the chat broadcast it to others
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
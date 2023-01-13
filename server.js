const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('sender-join', function(data) {
        socket.join(data.udi);
    });
    socket.on('receiver-join', function(data) {
        socket.join(data.udi);
        socket.in(data.sender_uid).emit('init', data.udi);
    });
    socket.on('file-meta', function(data) {
        socket.in(data.udi).emit("fs-meta", data.metadata);
    });
    socket.on('fs-start', function(data) {
        socket.in(data.udi).emit("fs-share", {});
    });
    socket.on('file-raw', function(data) {
        socket.in(data.udi).emit("fs-share", data.buffer);
    });
});
app.use(express.static(path.join(__dirname+'/public')));

server.listen(5000);
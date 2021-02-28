var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server)


connection = [];
server.listen(process.env.PORT || 3000);
console.log('Server is running ..');

io.sockets.on('connection',function (socket){
    connection.push(socket);
    console.log('Connect: %s sockets are connected', connection.length);

    //disconnections
    socket.on('disconnect', function (data){
        connection.slice(connection.indexOf(socket), 1);
        console.log('Disconnect: %s sockets are connected', connection.length);
    });

    socket.on('Node JS Server PORT', function (data){
        console.log(data);
        io.sockets.emit('iOS Client', {msg: 'Hi iOS Client'});
    });
} );

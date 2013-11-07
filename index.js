var http = require('http');
var ecstatic = require('ecstatic');

var server = http.createServer(ecstatic({
    root: __dirname + '/public',
    autoIndex: true,
    gzip: true
}));

var io = require('socket.io').listen(server);

// Get weight through WS from server and pass on to clients
io.sockets.on('connection', function (socket) {
    socket.on('vote', function (data) {
        socket.broadcast.emit('vote', data);
    });
});

server.listen(process.env.PORT || 3001);
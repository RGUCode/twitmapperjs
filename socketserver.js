var io = require('socket.io').listen(80);
var ss = require('socket.io-stream');
var path = require('path');

io.of('/tweets').on('connection', function(socket) {
  
});

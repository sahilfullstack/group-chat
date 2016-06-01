var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);
var user = 'User:';

app.get('/', function(request, response) {
	user = request.connection.remoteAddress;
	user = user.slice(7);
	response.sendFile(__dirname +'/index.html');
});

io.on('connection', function(socket) {
	console.log('A connection was made');
	socket.on('chat.message', function(message) {
		io.emit('chat.message', user +" : "+ message);
	});

	socket.on('disconnect', function(message) {
		io.emit('chat.message', 'User has disconnected.');
	});
});

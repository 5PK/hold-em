/* *
 * 
 * This is the Server logic
 *
 * */


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var rooms = 0;


app.use(express.static('.'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

	/**
	 * Create a new game room and notify the creator of game. 
	 */
	socket.on('createLobby', function(data){
	  var lobbyCode = getLobbyCode();
	  socket.join(lobbyCode);
	  socket.emit('newLobby', {name: data.name, room: lobbyCode });
	  socket.nickname = data.name;
	});

	/**
	 * Connect the Player 2 to the room he requested. Show error if room full.
	 */
	socket.on('joinLobby', function(data){
	  console.log("joinlobby emit");
	  console.log(data.room);
   		
	  var room = io.nsps['/'].adapter.rooms[data.room];
	  if( room && room.length < 8){
	    console.log("join Lobby");
	    console.log(data.room);
	    socket.join(data.room);
	    socket.nickname = data.name;

	    var nicknameArr = [];

  	    for (socketID in io.nsps['/'].adapter.rooms[data.room].sockets) {
   		const nickname = io.nsps['/'].connected[socketID].nickname;
   		// do stuff with nickname
		nicknameArr.push(nickname);
 	    }		  
	    socket.emit('displayLobby', {name: data.name, room: data.room});
	    io.in(data.room).emit('updateLobbyList', {roster: nicknameArr});
	  }
	  else {
	    socket.emit('err', {message: 'Sorry, The room is null!'});
	  }
	});

	/**
	 * Handle the turn played by either player and notify the other. 
	 */
	socket.on('playTurn', function(data){
	  socket.broadcast.to(data.room).emit('turnPlayed', {
	    tile: data.tile,
	    room: data.room
	  });
	});

	/**
	 * Notify the players about the victor.
	 */
	socket.on('gameEnded', function(data){
	  socket.broadcast.to(data.room).emit('gameEnd', data);
	});

});

function getLobbyCode(){
 
 var code;
 var charArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
 var numArr = ["1","2","3","4","5","6","7","8","9","0"];
 code = charArr[Math.floor(Math.random()*charArr.length)] 
	+ charArr[Math.floor(Math.random()*charArr.length)] 
	+ charArr[Math.floor(Math.random()*charArr.length)] 
	+ charArr[Math.floor(Math.random()*charArr.length)] 
	+ numArr[Math.floor(Math.random()*numArr.length)];

 return code;
}



server.listen(5000);

/*
 * This is the Client facing Javascript
 *
 */

(function init() {

	var playerArr;
	let player;
	//let game;
	let lobby;


	var socket = io.connect('http://localhost:5000');


	/**
	 * Create a new lobby. Emit newLobby event.
	 */
	$('#createLobby').on('click', function() {
		var name = $('#nickname').val();
		if (!name) {
			alert('Please enter your name.');
			return;
		}

		socket.emit('createLobby', {
			name: name
		});
		player = new Player(name);
	});

	/** 
	 *  Join an existing lobby on the entered roomId. Emit the joinLobby event.
	 */
	$('#enterLobby').on('click', function() {
		console.log("enterLobby click");
		var nameJoin = $('#nicknameJoin').val();
		var lobbyId = $('#lobbyCode').val();

		console.log(nameJoin);


		console.log(lobbyId);
		if (!nameJoin || !lobbyId) {
			alert('Please enter your name and game ID.');
			return;
		}
		socket.emit('joinLobby', {
			name: nameJoin,
			room: lobbyId
		});
		player = new Player(nameJoin);
	});

	/** 
	 * New Lobby created by current client. Update the UI and create new Lobby.
	 */
	socket.on('newLobby', (data) => {
		const message =	`Hello, ${data.name}. Please ask your friends to enter Game ID: ${data.room}. Waiting for players...`;

		//create lobby
		lobby = new Lobby(data.room);
		lobby.displayLobby(message);
		$('#p1').text(data.name);
		console.log("room: " + data.room);
		console.log(data.name);
		console.log("display lobby");

	});

	//Enter Game Lobby after joinGame event
	socket.on('displayLobby', (data) => {
		const message = `Hello, ${data.name}. Please ask your friends to enter Game ID: ${data.room}. Waiting for players...`;

		//create lobby
		lobby = new Lobby(data.room);
		lobby.displayLobby(message);

	});

	//On Player Joining, update Lobby List
	socket.on('updateLobbyList', (data) => {
		var clientList = data.roster;
		console.log(clientList);
		for (var i = 0; i < clientList.length; i++) {
			console.log(clientList[i]);

			$('#p' + (i + 1)).text(clientList[i]);
		}
	});

})();

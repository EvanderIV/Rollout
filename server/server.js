const io = require('socket.io')();
//const { createGameState, gameLoop } = require('./game');
const TICK_RATE = 30;

io.on('connection', client => {
	client.emit('init', { data: 'Hello world!' });

	//const state = createGameState();
	
	client.on('update', handleUpdate);
	client.on('newGame', handleNewGame);
	client.on('joinGame', handleJoinGame);

	function handleUpdate(newState) {
		const roomName = clientRooms[client.id];
		let updateJSON;
		try {
			updateJSON = JSON.parse(newState);
		}
		catch (error) {
			console.error(error);
			return;
		}
		const posX = ;
		state[roomName].players[client.number - 1].vel = vel;
	}

	function handleNewGame() {
		let roomName = makeid(5);
		clientRooms[client.id] = roomName;
		client.emit('gameCode', roomName);

		state[roomName] = initGame();

		client.join(roomName);
		client.number = 1;
		client.emit('init', 1);
	}

	function handleJoinGame(roomName) {
		const room = io.sockets.adapter.rooms[roomName];

		let allUsers;
		if (room) {
			allUsers = room.sockets;
		}

		let numClients = 0;
		if (allUsers) {
			numClients = Object.keys(allUsers).length;
		}

		if (numClients === 0) {
			client.emit('unknownCode');
			return;
		} else if (numClients > 1) {
			client.emit('tooManyPlayers');
			return;
		}

		clientRooms[client.id] = roomName;

		client.join(roomName);
		client.number = 2;
		client.emit('init', 2);

		startGameInterval(roomName);
	}

	startGameInterval(client, state);
});

function startGameInterval(client, state) {
	const intervalID = setInterval(() => {
		const winner = gameLoop(state[roomName]);

		if (!winner) {
			emitGameState(roomName, state[roomName]);
		}
		else {
			emitGameOver(roomName, winner);
			state[roomName] = null;
			clearInterval(intervalID);
		}
	}, 1000 / TICK_RATE);
}

function emitGameState(room, gameState) {
	// Send this event to everyone in the room.
	io.sockets.in(room).emit('gameState', JSON.stringify(gameState));
}

function emitGameOver(room, winner) {
	io.sockets.in(room).emit('gameOver', JSON.stringify({ winner }));
}

io.listen(process.env.PORT || 80);


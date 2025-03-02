function requestFullScreen(element) {
	// Supports most browsers and their versions.
	var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

	if (requestMethod) { // Native full screen.
		requestMethod.call(element);
	}
	else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
}

let playerBall = document.getElementById("playerBall");
let world = document.getElementById("world");

let x = 0;
let y = 0;
let z = 0;

let accelX = 0;
let accelY = 0;

let velX = 0;
let velY = 0;

let compatAccelMult = 1.0;

let hyperspeed = false;

let displacementX = 0.0;
let displacementY = 0.0;

//var elem = document.body; // Make the body go full screen.
//requestFullScreen(elem);

function buildWorld(id) {
	switch (id) {
		case 0:
			let obstacle_0 = document.createElement("img");
			world.appendChild(obstacle_0);
			break;
	}
}



function init() {
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
}

function keydown(e) {
	console.log(e.keyCode);

	if (e.keyCode === 40) {
		y = 38;
	}
	else if (e.keyCode === 39) {
		x = 38;
	}
	else if (e.keyCode === 38) {
		y = -38;
	}
	else if (e.keyCode === 37) {
		x = -38;
	}

	if (Math.abs(x) > 37 && Math.abs(y) > 37) {
		compatAccelMult = 0.707;
	}
	else {
		compatAccelMult = 1.0;
	}
}

function keyup(e) {
	if (e.keyCode === 40) {
		y = 0;
	}
	else if (e.keyCode === 39) {
		x = 0;
	}
	else if (e.keyCode === 38) {
		y = 0;
	}
	else if (e.keyCode === 37) {
		x = 0;
	}
	if (Math.abs(x) > 37 && Math.abs(y) > 37) {
		compatAccelMult = 0.707;
	}
	else {
		compatAccelMult = 1.0;
	}
}

const socket = io('http://localhost:3000');

socket.on('init', handleInit);

const gameState = {
	player: {
		position: {
			x: 50,
			y: 50
		},
		velocity: {
			x: 0,
			y: 0
		},
		abilities: {
			bump: 1
		},
		health: 5
	}
}

init();

function handleInit(msg) {
	console.log(msg);
}

if (window.DeviceMotionEvent == undefined) {
	//No accelerometer is present. Use buttons. 
	alert("No accelerometer found. Use arrow keys.");
}
else {
	window.addEventListener("deviceorientation", (event) => {
		z = event.alpha;
		y = event.beta;
		x = event.gamma;
	});
}

var Interval = window.setInterval(updateGamestate, 10);

function updateGamestate() {
	
	let mult = 1.0;
	
	if (hyperspeed) {
		mult *= 10;
	}
	
	if (Math.abs(x) < 8) {
		x = 0;
	}
	if (Math.abs(y) < 8) {
		y = 0;
	}
	if (x > 40) {
		x = 40;
	}
	if (x < -40) {
		x = -40;
	}
	if (y > 40) {
		y = 40;
	}
	if (y < -40) {
		y = -40;
	}
	
	accelX = x * compatAccelMult;
	accelY = y * compatAccelMult;
	
	velX /= 1.01;
	velY /= 1.01;
	
	if (Math.abs(velX) < 0.01) {
		velX = 0;
	}
	if (Math.abs(velY) < 0.01) {
		velY = 0;
	}
	
	velX += (accelX * mult);
	velY += (accelY * mult);
	
	displacementX -= (velX/1000);
	displacementY -= (velY/1000);
	document.getElementById("accel").innerHTML = "accelX = " + accelX;
	document.getElementById("vel").innerHTML = "velX   =" + velX;
	playerBall.style.marginLeft = (velX/100) + "%";
	playerBall.style.marginTop = (velY/100) + "%";
	world.style.left = displacementX + (velX/100) + "%";
	world.style.top = displacementY + (velY/100) + "%";
}





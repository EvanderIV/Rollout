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

let x;
let y;
let z;

let accelX;
let accelY;

let velX;
let velY;

let hyperspeed = false;

var elem = document.body; // Make the body go full screen.
requestFullScreen(elem);

function init() {
	document.addEventListener('keydown', keydown);
}

function keydown(e) {
	console.log(e.keyCode);
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
	alert("no accelerometer");
}
else {
	alert("accelerometer found");
	window.addEventListener("devicemotion", accelerometerUpdate, true);
}

function accelerometerUpdate(event) {
	x = event.accelerationIncludingGravity.x;
	y = event.accelerationIncludingGravity.y;
	z = event.accelerationIncludingGravity.z;
}

var Interval = window.setInterval(updateGamestate, 10);

function updateGamestate() {
	
	let mult = 1.0;
	
	if (hyperspeed) {
		mult *= 10;
	}
	
	velX += (accelX * mult);
	velY += (accelY * mult);
	
	playerBall.style.marginLeft = velX;
	playerBall.style.marginTop = velY;
}





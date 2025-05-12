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

var cookies = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) =>
        ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }),
{});

window.mobileAndTabletCheck = function() {
  let check = false;                                                                                                                                                  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};                                                                                                                                                                  
let isMobileUser = window.mobileAndTabletCheck();

function getGamepadInput() {
	return JSON.stringify([...navigator.getGamepads()].filter(p => p).map(pad => ({
			index: pad.index,
			id: pad.id,
			mapping: pad.mapping,
			axes: pad.axes,
			buttons: [...pad.buttons].map(b => ({
				pressed: b.pressed,
				touched: b.touched,
				value: b.value
			})),
			vibrationActuator: pad.vibrationActuator
		})),
		null,
		2
	);
}

function GetAngleDegree(x,y) {
	var n = 270 - (Math.atan2(-y, -x)) * 180 / Math.PI;
	return n % 360;
}

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

let sqr = document.getElementById("sqr");
let playerBall = document.getElementById("player-ball-div");
let playerBallOverlay = document.getElementById("player-ball-overlay");
let world = document.getElementById("world");
let ui = document.getElementById("ui-root");
let fire = document.getElementById("drop-fire");
let fireTexture = document.getElementById("fire-texture");
let dropShadow = document.getElementById("drop-shadow");

let equipped_dash = false;
let equipped_pound = false;

let x = 0;
let y = 0;
let z = 0;
let angle = 0;
let accelX = 0;
let accelY = 0;
let accelZ = 0;

let velX = 0;
let velY = 0;
let velZ = 0;

let compatAccelMult = 1.0;

let displacementX = 0.0;
let displacementY = 0.0;
let displacementZ = 0.0;

let cameraOffsetX = 0;
let cameraOffsetY = 0;

let maxTiles = 0;
let maxHeight = 0;

let elasticity = 0.5;

let lines;

let tileType = "ground";

let size = 10;

let blurDuration = 0;
let blurTimer = 0;
let blurIntensity = 0;

let mult = 1.0;

let superSpeedThreshold = 3000;

let cooldown_jump = 3000;
let cooldown_dash = 7000;
let cooldown_pound = 8000;
let cooldown_repulse = 12000;
let cooldown_parry = 7000;

let cooldown_jump_timer = 0;
let cooldown_dash_timer = 0;
let cooldown_pound_timer = 0;
let cooldown_repulse_timer = 0;
let cooldown_parry_timer = 0;

let indexX = 0;
let indexY = 0;

let runningBenchmark = false;
let benchmarkTimer = 0;

let renderBlur = !document.cookie.includes("blur=false");
let renderFire = !document.cookie.includes("fire=false");
let renderShadow = !document.cookie.includes("shadow=false");
let graphics_terrain_high = !document.cookie.includes("hiRezTerrain=false");
let benchmarksDuringGame = !document.cookie.includes("allowBenchmarks=false");

let compatTickMult = 1.0;

let useVibration = !document.cookie.includes("vibration=false");

let idSelected = "lets-get-it-started";
let settingsOpen = false;

let targetFPS = 60;
let update_ms = (1000/targetFPS)


if (!document.cookie.includes("fps=low") && !document.cookie.includes("fps=medium")) {
	compatTickMult = 1.0;
}
else if (document.cookie.includes("fps=low")) {
	compatTickMult = 2.0;
}
else if (document.cookie.includes("fps=medium")) {
	compatTickMult = 1.5;
}
/*
if (compatTickMult > 1) {
	world.style.transition = "all " + ((10*compatTickMult)/1000) + "s ease";
	playerBall.style.transition = "all " + ((10*compatTickMult)/1000) + "s ease";
	dropShadow.style.transition = "all " + ((10*compatTickMult)/1000) + "s ease";
	fire.style.transition = "all " + ((10*compatTickMult)/1000) + "s ease";
	fireTexture.style.transition = "all " + ((10*compatTickMult)/1000) + "s ease";
}
*/



let canVibrate;
try {
	canVibrate = window.navigator.vibrate;
}
catch (error) {
	canVibrate = false;
}
function vibrate(duration) {
	if (getGamepadInput() !== "[]" && useVibration) {
		try {
			navigator.getGamepads()[0].vibrationActuator.playEffect("dual-rumble", {
				startDelay: 0,
				duration: (duration),
				weakMagnitude: clamp((duration/80), 0.0, 1.0),
				strongMagnitude: clamp((duration/80), 0.0, 1.0)
			});
		}
		catch (error) {}
	}
	else if (canVibrate && useVibration) {
		window.navigator.vibrate(duration);
	}
}

let mapLoaded = false;

function blur(duration, intensity) {
	if (renderBlur) {
		blurDuration = duration;
		blurTimer = duration;
		blurIntensity = intensity;
	}
}

function buildWorld(map) {
	const xmlhttpReq = new XMLHttpRequest();
	xmlhttpReq.onload = function() {
		// Clear the world, but not the player elements
		for (let child = world.children.length - 1; child >= 0; child--) {
			if (world.children[child].id.includes("row-")) {
				world.removeChild(world.children[child]);
			}
		}
		/*
		// Add the player elements first
		dropShadow = document.createElement("div");
		dropShadow.id = "drop-shadow";
		dropShadow.className = "absolute ball-shadow";
		world.appendChild(dropShadow);

		fire = document.createElement("div");
		fire.id = "drop-fire";
		fire.className = "flex column absolute ball-fire";
		fire = document.createElement("img");
		fireTexture.id = "fire-texture";
		fireTexture.src = "./img/fire.gif";
		fireTexture.className = "absolute";
		fireTexture.style.width = "100%";
		fireTexture.style.height = "auto";
		fireTexture.style.marginTop = "75%";
		fireTexture.style.opacity = "0";
		fireTexture.style.alignSelf = "start";
		fireTexture.style.transform = "rotate(180deg)";
		fire.appendChild(fireTexture);
		world.appendChild(fire);

		let playerBall = document.createElement("div");
		playerBall.id = "player-ball-div";
		playerBall.className = "absolute flex";
		playerBall.style.zIndex = "10";
		playerBallOverlay = document.createElement("img");
		playerBallOverlay.id = "player-ball-overlay";
		playerBallOverlay.className = "align justify";
		playerBallOverlay.src = "./img/marble_overlay0.png";
		playerBall.appendChild(playerBallOverlay);
		world.appendChild(playerBall);
		*/

		// Add the map elements

		let map = (this.responseText);
		lines = map.split("\n");
		maxHeight = lines.length;
		for (let i = 0; i < lines.length; i++) {
			if (lines[i].length > maxTiles) {
				maxTiles = lines[i].length;
			}
		}
		for (let i = 0; i < lines.length; i++) {
			if (lines[i] !== "") {
				let row = document.createElement("div");
				row.id = "row-" + i;
				row.classList.add("flex");
				row.classList.add("row");
				row.classList.add("tile-row");
				for (let ii = 0; ii < maxTiles; ii++) {
					// Get map data by character
					let tile = document.createElement("div");
					tile.id = "tile-" + ii + "-" + i;
					tile.classList.add("tile");
					tile.style.width = (100/maxTiles) + "%";
					if (ii < lines[i].length) {
						tileID = ((ii % 8) + ((i % 8) * 8));
						switch (lines[i][ii].toUpperCase()) {
							case " ":
								tile.value = "empty";
								break;
							case "W":
								tile.value = "wall";
								let wall = document.createElement("img");
								if (graphics_terrain_high) {
									wall.src = "./img/wall/rusty_metal/source.jpg";
								}
								else {
									wall.src = "./img/wall/rusty_metal/low.png";
								}
								tile.appendChild(wall);
								break;
							case ".":
								tile.value = "ground";
								let ground = document.createElement("img");
								let yStringNum = (i % 9);
								let yString;
								if (i % 9 === 0) {
									yString = "";
								}
								else {
									yString = (((ii % 9) + yStringNum) * 8).toString();
								}
								if (graphics_terrain_high) {
									ground.src = "./img/ground/mud_cracked/tile" + tileID + ".jpg";
								}
								else {
									ground.src = "./img/ground/mud_cracked/low.png";
								}
								tile.appendChild(ground);
								break;
						}
					}
					else {
						tile.value = "empty";
					}
					row.appendChild(tile);
					row.style.width = (maxTiles * 10) + "%";
				}
				world.appendChild(row);
			}
		}
		mapLoaded = true;
	}
	xmlhttpReq.open("GET", "./maps/" + map);
	xmlhttpReq.send();
}



function init() {
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
}

function keydown(e) {
	console.log(e.keyCode);

	if (e.keyCode === 40 || e.keyCode === 83) { // S
		y = 58;
	}
	else if (e.keyCode === 39 || e.keyCode === 68) { // D
		x = 58;
	}
	else if (e.keyCode === 38 || e.keyCode === 87) { // W
		y = -58;
	}
	else if (e.keyCode === 37 || e.keyCode === 65) { // A
		x = -58;
	}
	else if (e.keyCode === 32) { // Space | Jump
		handleInput("jump");
	}
	else if (e.keyCode === 74) { // J | Dash / Ground Pound / 
		handleInput("movement");
	}
	else if (e.keyCode === 75) { // K | Repulse / Parry / 
		handleInput("defense");
	}
	else if (e.keyCode === 76) { // L | 
	}

	if (Math.abs(x) > 37 && Math.abs(y) > 37) {
		compatAccelMult = 0.707;
	}
	else {
		compatAccelMult = 1.0;
	}
}

function keyup(e) {
	if (e.keyCode === 40 || e.keyCode === 83) {
		y = 0;
	}
	else if (e.keyCode === 39 || e.keyCode === 68) {
		x = 0;
	}
	else if (e.keyCode === 38 || e.keyCode === 87) {
		y = 0;
	}
	else if (e.keyCode === 37 || e.keyCode === 65) {
		x = 0;
	}
	if (Math.abs(x) > 37 && Math.abs(y) > 37) {
		compatAccelMult = 0.707;
	}
	else {
		compatAccelMult = 1.0;
	}
}

//const socket = io('http://localhost:80');

//socket.on('init', handleInit);
//socket.on('gameState', handleGameState);


function createGameState() {
	return {
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
}

init();

function handleInit(msg) {
	console.log(msg);
}

function handleGameState(gameState) {
	gameState = JSON.parse(gameState);
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
		if (isMobileUser) {
			y = -event.gamma;
			x = event.beta;
		}
	});
}

// Collision Cache
let rows = document.getElementsByClassName('tile-row');

function checkCollision() {
	let calcOffsetX = 10 * maxTiles;
	let calcOffsetY = 10 * maxHeight;
	if (maxTiles % 2 === 1) {
		calcOffsetX -= 0;
	}
	else {
		calcOffsetX -= 0;
	}
	if (maxHeight % 2 === 1) {
		calcOffsetY += 10;
	}
	else {
		calcOffsetY -= 10;
	}
	indexX = Math.floor((-displacementX + calcOffsetX)/20);
	indexY = Math.floor((-displacementY + calcOffsetY)/20);
	try {
		let tile = rows[indexY].childNodes[indexX];
		if (tile.value !== tileType) {
			//console.log(tile.value);
		}
		tileType = tile.value;
	}
	catch (error) {
		if (tileType !== "empty") {
			//console.log("empty");
		}
		tileType = "empty";
	}
	try {
		let adjX = Math.floor((-displacementX + calcOffsetX + (size))/20);
		let tile = rows[indexY].childNodes[adjX];
		if (tile.value === "wall" && displacementZ < 1.9 && velX > 0) {
			//cameraOffsetX = velX/(200 * elasticity);
			if (velX > 200) {
				vibrate(Math.abs(velX)/50);
			}
			velX *= -elasticity;
		}
		else if (tile.value === "wall" && displacementZ < 1.9) {
			velX += -50;
		}
		if (tile.value !== "empty" && displacementZ < -0.3 && velX > 0) {
			if (velX > 200) {
				vibrate(Math.abs(velX)/50);
			}
			velX *= -elasticity;
		}
		else if (tile.value !== "empty" && displacementZ < -0.3) {
			velX += -50;
		}
	}
	catch (error) {}
	try {
		let adjX = Math.floor((-displacementX + calcOffsetX - (size))/20);
		let tile = rows[indexY].childNodes[adjX];
		if (tile.value === "wall" && displacementZ < 1.9 && velX < 0) {
			if (velX < -200) {
				vibrate(Math.abs(velX)/50);
			}
			velX *= -elasticity;
		}
		else if (tile.value === "wall" && displacementZ < 1.9) {
			velX += 50;
		}
		if (tile.value !== "empty" && displacementZ < -0.3 && velX < 0) {
			if (velX < -200) {
				vibrate(Math.abs(velX)/50);
			}
			velX *= -elasticity;
		}
		else if (tile.value !== "empty" && displacementZ < -0.3) {
			velX += 50;
		}
	}
	catch (error) {}
	try {
		let adjY = Math.floor((-displacementY + calcOffsetY + (size))/20);
		let tile = rows[adjY].childNodes[indexX];
		if (tile.value === "wall" && displacementZ < 1.9 && velY > 0) {
			if (velY > 200) {
				vibrate(Math.abs(velY)/50);
			}
			velY *= -elasticity;
		}
		else if (tile.value === "wall" && displacementZ < 1.9) {
			velY += -50;
		}
		else if (tile.value !== "empty" && displacementZ < -0.3 && velY > 0) {
			if (velY > 200) {
				vibrate(Math.abs(velY)/50);
			}
			velY *= -elasticity;
		}
		else if (tile.value !== "empty" && displacementZ < -0.3) {
			velY += -50;
		}
	}
	catch (error) {}
	try {
		let adjY = Math.floor((-displacementY + calcOffsetY - (size))/20);
		let tile = rows[adjY].childNodes[indexX];
		if (tile.value === "wall" && displacementZ < 1.9 && velY < 0) {
			if (velY < -200) {
				vibrate(Math.abs(velY)/50);
			}
			velY *= -elasticity;
		}
		else if (tile.value === "wall" && displacementZ < 1.9) {
			velY += 50;
		}
		if (tile.value !== "empty" && displacementZ < -0.3 && velY < 0) {
			if (velY < -200) {
				vibrate(Math.abs(velY)/50);
			}
			velY *= -elasticity;
		}
		else if (tile.value !== "empty" && displacementZ < -0.3) {
			velY += 50;
		}
	}
	catch (error) {}
}

document.getElementById("lets-get-it-started").disabled = "true";

if (document.cookie.includes("nick")) {
	document.getElementById("input-nickname").value = cookies.nick;
	document.getElementById("lets-get-it-started").classList.remove("disabled-start");
	document.getElementById("lets-get-it-started").classList.add("valid");
}

document.getElementById("input-nickname").addEventListener("input", function() {
	if (document.getElementById("input-nickname").value.length > 2) {
		document.getElementById("lets-get-it-started").classList.remove("disabled-start");
		document.getElementById("lets-get-it-started").classList.add("valid");
	}
	else {
		document.getElementById("lets-get-it-started").classList.add("disabled-start");
		document.getElementById("lets-get-it-started").classList.remove("valid");
	}
});

function startEngine() {
	if (!renderShadow) {
		//$("#drop-shadow").remove();
		world.removeChild(dropShadow);
	}
	if (!renderFire) {
		//$("#drop-fire").remove();
		world.removeChild(fire);
	}
	document.cookie = "nick=" + document.getElementById("input-nickname").value;
	document.getElementById("ui-root").removeChild(document.getElementById("nickname-div"));
	if (!alreadyStarted) {
		var Interval = window.setInterval(updateGamestate, (update_ms * compatTickMult));
		alreadyStarted = true;
		if (getGamepadInput !== "[]") {
			vibrate(100);
		}
		else if (canVibrate && useVibrate) {
			navigator.vibrate([10,10,10,10,10,10,10,10,10,10]);
		}
		clearInterval(ControllerInput);
	}
}

let alreadyStarted = false;
document.getElementById("lets-get-it-started").addEventListener("click", function() {
	startEngine();
});

document.getElementById("input-nickname").addEventListener("keyup", ({key}) => {
	if (key === "Enter") {
		startEngine();
	}
});

function benchmark(duration) {
	if (duration < 1) {
		duration = 1;
	}
	runningBenchmark = true;
	benchmarkTimer = 0;
	setTimeout(function() {
		runningBenchmark = false;
		if (benchmarkTimer <= (750 * duration)) {
			console.log("Benchmark found strong evidence of slowdown (" + (benchmarkTimer/(10 * duration)) + "% gamespeed)");
		}
		else if (benchmarkTimer <= (975 * duration)) {
			console.log("Benchmark found evidence of possible slowdown (" + (benchmarkTimer/(10 * duration)) + "% gamespeed)");
		}
		else {
			console.log("Benchmark found no substantial evidence of slowdown (" + (benchmarkTimer/(10 * duration)) + "% gamespeed)");
		}
	}, (duration * 1000));
}
setTimeout(function() {
	benchmark(2);
}, 2000);

let nickDiv = document.getElementById("nickname-div");
let menuStart = document.getElementById("menu-div-start");
let menuSettings = document.getElementById("menu-div-settings");
let settings = document.getElementById("settings-back-button");
settings.addEventListener("click", function() {
	if (!settingsOpen) {
		settingsOpen = true;
		settings.style.marginLeft = "-30vmin";
		settings.style.marginTop = "-47vmin";
		document.getElementById("settings-back-text").innerText = "Back";
		menuStart.style.opacity = "0";
		menuSettings.style.display = "flex";
		menuSettings.style.opacity = "100%";
		nickDiv.style.height = "50vmin";
		setTimeout(function() {
			menuStart.style.display = "none";
		}, 200);
	}
	else {
		settingsOpen = false;
		settings.style.marginLeft = "30vmin";
		settings.style.marginTop = "-22vmin";
		document.getElementById("settings-back-text").innerText = "Settings";
		menuStart.style.display = "flex";
		menuStart.style.opacity = "100%";
		menuSettings.style.opacity = "0";
		nickDiv.style.height = "25vmin";
		setTimeout(function() {
			menuSettings.style.display = "none";
		}, 200);
	}
});

if (isMobileUser) {
	nickDiv.style.transform = "scale(1.9)";
}

function menuControllerHandler() {
	if (runningBenchmark) {
		benchmarkTimer += update_ms * compatTickMult;
	}
	if (getGamepadInput() !== "[]") {
		if (JSON.parse(getGamepadInput())[0].buttons[1].pressed) { // SwitchPro: A
			switch (idSelected) {
				default:
					while (JSON.parse(getGamepadInput())[0].buttons[1].pressed) {}
					startEngine();
					break;
			}
		}
	}
}








let shadowsToggle = document.getElementById("toggle-shadows");
let texturesToggle = document.getElementById("toggle-textures");
let speedfxToggle = document.getElementById("toggle-speedfx");
let rumbleToggle = document.getElementById("toggle-rumble");

shadowsToggle.checked = renderShadow;
texturesToggle.checked = graphics_terrain_high;
speedfxToggle.checked = renderBlur && renderFire;
rumbleToggle.checked = useVibration;

shadowsToggle.addEventListener("click", function() {
	renderShadow = shadowsToggle.checked;
	document.cookie = "shadow=" + shadowsToggle.checked;
});

texturesToggle.addEventListener("click", function() {
	graphics_terrain_high = texturesToggle.checked;
	document.cookie = "hiRezTerrain=" + texturesToggle.checked;
	if (mapLoaded) {
		buildWorld("lobby.dat");
	}
});

speedfxToggle.addEventListener("click", function() {
	renderBlur = speedfxToggle.checked;
	renderFire = speedfxToggle.checked;
	document.cookie = "blur=" + speedfxToggle.checked;
	document.cookie = "fire=" + speedfxToggle.checked;
});

rumbleToggle.addEventListener("click", function() {
	useVibration = rumbleToggle.checked;
	document.cookie = "vibration=" + rumbleToggle.checked;
});





var ControllerInput = window.setInterval(menuControllerHandler, update_ms * compatTickMult);

function handleInput(input) {
	switch (input.toLowerCase()) {
		case "jump":
			if (cooldown_jump_timer === 0) {
				velZ = -300;
				cooldown_jump_timer = cooldown_jump;
			}
			break;
		case "movement":
			if (equipped_dash && (Math.abs(accelX) > 0 || Math.abs(accelY) > 0) && cooldown_dash_timer === 0) {
				mult = 50;
				blur(150, 0.25);
				cooldown_dash_timer = cooldown_dash;
			}
			else if (equipped_pound && displacementZ !== 0.0 && cooldown_pound_timer === 0) {
				velZ = 750;
				cooldown_pound_timer = cooldown_pound;
			}
			break;
		case "defense":
			if (equipped_repulse && cooldown_repulse_timer === 0) {
				cooldown_repulse_timer = cooldown_repulse;
			}
			else if (equipped_parry && cooldown_parry_timer === 0) {
				cooldown_parry_timer = cooldown_parry;
			}
			break;
	}
}


function updateGamestate() {

	if (benchmarksDuringGame) {
		benchmarkTimer += (update_ms * compatTickMult);
		if (benchmarkTimer > 10000) {
			benchmark(5);
		}
	}

	if (getGamepadInput !== "[]") {
		try {
			x = JSON.parse(getGamepadInput())[0].axes[0] * 59;
			y = JSON.parse(getGamepadInput())[0].axes[1] * 59;

			if (JSON.parse(getGamepadInput())[0].buttons[1].pressed && cooldown_jump_timer === 0) { // SwitchPro: A
				handleInput("jump");
			}
			if (JSON.parse(getGamepadInput())[0].buttons[0].pressed) { // SwitchPro: B
				handleInput("movement");
			}

		}
		catch (error) {}
	}

	let onGround;
	if ((displacementZ <= 0 && tileType !== "empty") || (displacementZ <= 2 && tileType === "wall") || (displacementZ <= 2 && tileType === "destructible")) {
		onGround = true;
	}

	if (Math.abs(x) < 8) {
		x = 0;
	}
	if (Math.abs(y) < 8) {
		y = 0;
	}
	if (isMobileUser) {
		let magnitude = Math.sqrt((x*x)+(y*y));
		if (magnitude > 20) {
			x /= magnitude;
			y /= magnitude;
			x *= 20 * mult;
			y *= 20 * mult;
		}
		x *= 3;
		y *= 3;
	}
	accelX = x * compatAccelMult;
	accelY = y * compatAccelMult;
	accelZ = 7;
	
	velX /= (1.00 + (0.01 * compatTickMult));
	velY /= (1.00 + (0.01 * compatTickMult));
	velZ /= (1.00 + (0.01 * compatTickMult));
	
	if (Math.abs(velX) < 0.01) {
		velX = 0;
	}
	if (Math.abs(velY) < 0.01) {
		velY = 0;
	}
	if (Math.abs(velZ) < 0.1) {
		velZ = 0;
	}

	velX += (accelX * mult * compatTickMult);
	velY += (accelY * mult * compatTickMult);
	if (!onGround) {
		velZ += (accelZ * compatTickMult);
	}
	
	displacementX -= ((velX/2000) * compatTickMult);
	displacementY -= ((velY/2000) * compatTickMult);

	if (onGround && velZ >= 2.5) {
		velZ *= -elasticity;
	}
	if (onGround && Math.abs(velZ) < 2.5) {
		if (tileType === "ground") {
			displacementZ = 0;
		}
		else {
			displacementZ = 2;
		}
		velZ = 0;
	}

	displacementZ -= ((velZ/2000) * compatTickMult);
	

	cameraAnchorX = (velX/100);
	cameraAnchorY = (velY/100);

	angle = -GetAngleDegree(velX, velY) + 180;
	//fire.style.transform = "rotate(" + angle + "deg)";

	let magnitudeVelocity = Math.sqrt((velY*velY) + (velX*velX));
	if (magnitudeVelocity > superSpeedThreshold) {
		let ratioSpeed = (magnitudeVelocity - superSpeedThreshold) / (superSpeedThreshold * 4);
		fireTexture.style.height = (ratioSpeed * 40) + "vmin";
		if (ratioSpeed < 1) {
			fireTexture.style.opacity = (ratioSpeed * 100) + "%";
		}
		else {
			fireTexture.style.opacity = "100%";
		}
	}
	else {
		fireTexture.style.opacity = "0";
	}
	
	let offsetDueTo3D = Math.log2(displacementZ + 1);
	let scale3D = ((10 - Math.log2(displacementZ + 1))/10);

	playerBall.style.backgroundPosition = (-displacementX) + "vmin " + (-displacementY) + "vmin";
	if (displacementZ >= 0) {
		if (isMobileUser) {
			world.style.transform = "scale(" + ((100 - (Math.log2(displacementZ + 1) * 10))/100) + ") translate(" + (((-displacementY - cameraOffsetY) - offsetDueTo3D)/2) + "vmin, " + (((displacementX + cameraOffsetX) - offsetDueTo3D)/2) + "vmin) rotate(90deg)";
		}
		else {
			world.style.transform = "scale(" + ((100 - (Math.log2(displacementZ + 1) * 10))/100) + ") translate(" + (((displacementX + cameraOffsetX) - offsetDueTo3D)/2) + "vmin, " + (((displacementY + cameraOffsetY) - offsetDueTo3D)/2) + "vmin)";
		}
		playerBall.style.transform = "scale(" + ((size/10)/scale3D) + ") translate(" + (-displacementX/2*scale3D) + "vmin, " + (-displacementY/2*scale3D) + "vmin)";
		playerBall.style.zIndex = "20";
		fire.style.transform = "scale(" + ((size/10)/scale3D) + ") translate(" + (-displacementX/2*scale3D) + "vmin, " +(-displacementY/2*scale3D) + "vmin) rotate(" + angle + "deg)";
		fire.style.zIndex = "15";
		dropShadow.style.zIndex = "10";
		playerBallOverlay.style.opacity = "100%";
		if (renderShadow) {
			dropShadow.style.transform = "translate(" + ((-displacementX/2) - (5 * (1 - (1/scale3D)))) + "vmin, " + ((-displacementY/2) - (5 * (1 - (1/scale3D)))) + "vmin)";
		}
	}
	else {
		if (isMobileUser) {
			world.style.transform = "scale(1.0) translate(" + ((-displacementY - cameraOffsetY)/2) + "vmin, " + ((displacementX + cameraOffsetX)/2) + "vmin) rotate(90deg)";
		}
		else {
			world.style.transform = "scale(1.0) translate(" + ((displacementX + cameraOffsetX)/2) + "vmin, " + ((displacementY + cameraOffsetY)/2) + "vmin)";
		}
		let centralScalingMod = 1/(((size * 10)/(size - (displacementZ/1)))/10);
		playerBall.style.transform = "scale(" + (((size * 10)/(size - (displacementZ/1)))/10) + ") translate(" + ((-displacementX/2) * centralScalingMod) + "vmin, " + ((-displacementY/2) * centralScalingMod) + "vmin)";
		fire.style.transform = "scale(" + (((size * 10)/(size - (displacementZ/1)))/10) + ") translate(" + ((-displacementX/2) * centralScalingMod) + "vmin, " + ((-displacementY/2) * centralScalingMod) + "vmin) rotate(" + angle + "deg)";
		if (displacementZ < -1) {
			playerBall.style.zIndex = "-10";
			fire.style.zIndex = "-15";
			dropShadow.style.zIndex = "-20";
		}
		playerBallOverlay.style.opacity = (1000/(10 - (displacementZ*2))) + "%";
		if (renderShadow) {
			dropShadow.style.transform = "scale(" + (((size * 10)/(size - (displacementZ/1)))/10) + ") translate(" + ((-displacementX/2) * centralScalingMod) + "vmin, " + ((-displacementY/2) * centralScalingMod) + "vmin)";
		}
	}
	
	if (Math.abs(cameraOffsetX) < 0.1) {
		cameraOffsetX = 0.0;
	}
	if (Math.abs(cameraOffsetY) < 0.1) {
		cameraOffsetY = 0.0;
	}
	cameraOffsetX = cameraOffsetX + (((cameraAnchorX - cameraOffsetX) / 20) * compatTickMult);
	cameraOffsetY = cameraOffsetY + (((cameraAnchorY - cameraOffsetY) / 20) * compatTickMult);
	

	if (mapLoaded) {
		checkCollision();
	}
	
	if (mult > 1.0) {
		mult /= 2;
	}
	else {
		mult = 1.0;
	}

	if (cooldown_dash_timer > 0) {
		cooldown_dash_timer -= (update_ms * compatTickMult);
	}
	else {
		cooldown_dash_timer = 0;
	}
	if (cooldown_pound_timer > 0) {
		cooldown_pound_timer -= (update_ms * compatTickMult);
	}
	else {
		cooldown_pound_timer = 0;
	}
	if (cooldown_jump_timer > 0) {
		cooldown_jump_timer -= (update_ms * compatTickMult);
	}
	else {
		cooldown_jump_timer = 0;
	}
	if (blurTimer > 0) {
		let ratioBlur = (blurTimer/blurDuration);
		if (blurTimer === blurDuration) {
			ratioBlur = 0.5;
		}
		ui.style.backdropFilter = "blur(" + (ratioBlur * blurIntensity) + "vmin)";
		blurTimer -= (update_ms * compatTickMult);
	}
	else {
		ui.style.backdropFilter = "";
	}



}

buildWorld("lobby.dat");

if (isMobileUser) {
	world.style.transform = "rotate(90deg)";
	ui.style.transform = "rotate(90deg)";
}


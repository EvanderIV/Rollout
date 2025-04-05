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

function GetAngleDegree(x,y) {
	var n = 270 - (Math.atan2(-y, -x)) * 180 / Math.PI;
	return n % 360;
}

let sqr = document.getElementById("sqr");
let world = document.getElementById("world");
let ui = document.getElementById("ui-root");

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

let displacementX = 0.0;
let displacementY = 0.0;
let displacementZ = 0.0;

let cameraOffsetX = 0;
let cameraOffsetY = 0;

let maxTiles = 0;
let maxHeight = 0;

let lines;

let tileType = "ground";

let size = 10;

let blurDuration = 0;
let blurTimer = 0;
let blurIntensity = 0;

let renderDistance = 10;

let indexX = 0;
let indexY = 0;

let renderBlur = !document.cookie.includes("blur=false");
let renderFire = !document.cookie.includes("fire=false");
let renderShadow = !document.cookie.includes("shadow=false");

let superSpeedThreshold = 2000;

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
				row.classList.add("flex");
				row.classList.add("row");
				row.classList.add("tile-row");
				for (let ii = 0; ii < maxTiles; ii++) {
					// Get map data by character
					let tile = document.createElement("div");
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
								wall.src = "../img/wall_rusty_metal.jpg";
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
								ground.src = "../img/ground/mud_cracked/tile" + tileID + ".jpg";
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
		let maxDimension = maxTiles;
		if (maxHeight > maxTiles) {
			maxDimension = maxHeight;
		}
		world.style.transform = "scale(" + (10/maxDimension) + ")";
		mapLoaded = true;
	}
	xmlhttpReq.open("GET", "../maps/" + map);
	xmlhttpReq.send();
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

function handleInit(msg) {
	console.log(msg);
}

function handleGameState(gameState) {
	gameState = JSON.parse(gameState);
}



function updateGamestate() {

}

buildWorld("lobby.dat");



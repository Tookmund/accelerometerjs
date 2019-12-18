function getMotion(event) {
	var x = event.accelerationIncludingGravity.x;
	var y = event.accelerationIncludingGravity.y;
	var z = event.accelerationIncludingGravity.z;
	var str = "<p>X: "+x+"</p><p>Y: "+y+"</p><p>Z: "+z+"</p><p>Interval: "+event.interval;
	console.log(str);
	document.getElementById('acceldata').innerHTML = str;
}

// Device Motion request must come from a user-generated event
function requestMotion() {
	DeviceMotionEvent.requestPermission().then(response => {
	  if (response == 'granted') {
		  window.addEventListener("devicemotion", getMotion);
	  } else {
		  document.getElementById("log").innerHTML = "Need Device Motion!";
	  }
	});
}
document.getElementById("acceldata").innerHTML = "<button id='request'>BEGIN</button>";
document.getElementById("request").onclick = requestMotion;

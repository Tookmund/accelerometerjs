var maxX = 0;
var maxY = 0;
var maxZ = 0;
function getMotion(event) {
	var x = event.acceleration.x;
	var y = event.acceleration.y;
	var z = event.acceleration.z;
	if (Math.abs(x) > Math.abs(maxX)) maxX = x;
	if (Math.abs(y) > Math.abs(maxY)) maxY = y;
	if (Math.abs(z) > Math.abs(maxZ)) maxZ = z;
	document.getElementById('acceldata').innerHTML =
		"<p>X: "+x+"</p><p>Y: "+y+"</p><p>Z: "+z+"</p><p>"+
		"Interval: "+event.interval+
		"<p>Max X: "+maxX+"</p><p>Max Y: "+maxY+"</p><p>Max Z: "+maxZ+"</p>";
}

// Device Motion request must come from a user-generated event
function requestMotion() {
	DeviceMotionEvent.requestPermission().then(response => {
	  if (response == 'granted') {
		  window.addEventListener("devicemotion", getMotion);
		  let req =  document.getElementById("request");
		  req.innerHTML = "End";
		  req.onclick = endMotion;
	  } else {
		  document.getElementById("acceldata").innerHTML = "Need Device Motion!";
	  }
	});
}
document.getElementById("request").onclick = requestMotion;

function endMotion() {
	window.removeEventListener("devicemotion", getMotion);
	let req = document.getElementById("request");
	req.onclick = requestMotion;
	req.innerHTML = "Begin";
}

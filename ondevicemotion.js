function getMotion(event) {
	var x = event.acceleration.x;
	var y = event.acceleration.y;
	var z = event.acceleration.z;
	var str = "<p>X: "+x+"</p><p>Y: "+y+"</p><p>Z: "+z+"</p><p>Interval: "+event.interval;
	console.log(str);
	document.getElementById('acceldata').innerHTML = str;
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
		  document.getElementById("log").innerHTML = "Need Device Motion!";
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

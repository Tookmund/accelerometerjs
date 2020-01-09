// https://www.wired.com/story/iphone-accelerometer-physics/
var max;
var totalvel;
var numvels;
var times;

function resetMotion() {
	max = [0, 0, 0];
	totalvel = [0, 0, 0];
	numvels = 1;
	times = [0];
}


function getMotion(event) {
	var accel = [event.acceleration.x, event.acceleration.y, event.acceleration.z];
	numvels++;
	times.push(event.interval);

	for (var i in accel) {
		if (Math.abs(accel[i]) > Math.abs(max[i])) max[i] = accel[i];
		// Velocity = acceleration times the interval
		// v_i = v_i-1+a_i*interval
		totalvel[i] += totalvel[i]+accel[i]*event.interval;
	}

	document.getElementById('acceldata').innerHTML =
		"<p>X: "+accel[0]+"</p><p>Y: "+accel[1]+"</p><p>Z: "+accel[2]+"</p><p>"+
		"Interval: "+event.interval+
		"<p>Max X: "+max[0]+"</p><p>Max Y: "+max[1]+"</p><p>Max Z: "+max[2]+"</p>";
}

// Device Motion request must come from a user-generated event
function requestMotion() {
	try {
		DeviceMotionEvent.requestPermission().then(response => {
		  if (response == 'granted') {
			  resetMotion();
			  window.addEventListener("devicemotion", getMotion);
			  let req =  document.getElementById("request");
			  req.innerHTML = "End";
			  req.onclick = endMotion;
		  } else {
			  document.getElementById("acceldata").innerHTML = "Need Device Motion!";
		  }
		});
	}
	// Fallback to just trying to get device motion events without permission
	catch(error) {
		try {
			window.addEventListener("devicemotion", getMotion);
		}
		// Fallback to old API
		catch (err) {
			try {
				window.ondevicemotion = getMotion;
			}
			// Give up
			catch (e) {
				document.getElementById("acceldata").innerHTML = "No Access to device motion!";
			}
		}
	}
}

function endMotion() {
	try {
		window.removeEventListener("devicemotion", getMotion);
	} catch(e) {
		window.ondevicemotion = null;
	}
	var i = 0;
	for (let m in max) {
		if (max[m] > max[i]) i = m;
	}
	var avgvel = totalvel[i]/numvels;
	var dist = 0;
	for (let t in times) {
		// x_i = x_i-1+average velocity*change in time
		dist += avgvel*times[t];
	}
	document.getElementById("acceldata").innerHTML = "Distance: "+dist;
	let req = document.getElementById("request");
	req.onclick = requestMotion;
	req.innerHTML = "Begin";
}

window.onload = function () {
	document.getElementById("request").onclick = requestMotion;
}

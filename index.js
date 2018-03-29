let pitchData = [];
let xVal = 0;

function start() {
  microphonePitch.start(()=>{});
}

function changeNumPitchDataPoints(value) {
  numPitch = value;
}

function changeTargetPitch(value) {
  targetPitch = value;
}

microphonePitch.onPitchChange(pitch => {
  if (pitch !== -1 && pitch < 300) {
    xVal++;
    console.log(pitch);
    pitchData.length >= 20 && pitchData.shift();
    pitchData.push({x: xVal, y: parseInt(pitch)});
  }
});

window.onload = () => {
  var chart = new CanvasJS.Chart("chartContainer", {
  	title :{
  		text: "Pitch Analyzer"
  	},
  	axisY: {
  		includeZero: false,
      minimum: 0,
      maximum: 300,
      interval: 20
  	},
  	data: [{
  		type: "spline",
  		dataPoints: pitchData
  	}]
  });
  start();
  setInterval(function(){chart.render()}, 100);
};

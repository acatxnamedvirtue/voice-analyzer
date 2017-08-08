let counter = 1;
let lastUpdate = 1;
let numPitch = 1;
let targetPitch = 200;
let pitchData = [];

function start() {
  microphonePitch.start((error) => {
    document.getElementById('status').innerHTML = error ? error : 'Input started.';
  });
}

function changeNumPitchDataPoints(value) {
  numPitch = value;
}

function changeTargetPitch(value) {
  targetPitch = value;
}

setInterval(() => counter += 1);

microphonePitch.onPitchChange((pitch) => {
  if (pitch !== -1 && pitch < 300) {
    if (pitchData.length < numPitch) {
      console.log(numPitch);
      pitchData.push(parseInt(pitch));
    } else {
      pitchData.shift();
      pitchData.push(parseInt(pitch));
    }

    if (lastUpdate !== counter) {
      let sum = 0;
      pitchData.forEach(datum => sum += datum);
      const averagePitch = sum / pitchData.length;

      document.getElementById('pitch').innerHTML = `${Math.floor(averagePitch).toString()}`;
      if (targetPitch > pitch) {
        document.getElementById('feedback').innerHTML = 'GO HIGHER!!!!';
      } else {
        document.getElementById('feedback').innerHTML = 'Good';
      }
      lastUpdate = counter;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => start());
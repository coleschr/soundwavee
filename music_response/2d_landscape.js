var pos;
var amp;
var delta;
var freq;
var count;

function preload(){
  sound = loadSound('drum.wav');
}

function setup(){
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT(0.8, 512);
  sound.amp(0.2);

  pos = 0;
  amp = height;
  delta = amp/100;
  freq = 4;
  count = 0;
  background(0);
}

function draw(){
  var spectrum = fft.analyze();
  // noStroke();
  // fill(0,255,0); // spectrum is green
  // for (var i = 0; i< spectrum.length; i++){
  //   var x = map(i, 0, spectrum.length, 0, width);
  //   var h = -height + map(spectrum[i], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h )
  // }

  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  if(count % freq == 0)
  {
    for (var i = 0; i< spectrum.length; i++){
      var x = map(i, 0, spectrum.length, 0, width);
      var y = map( spectrum[i]*waveform[i], 0, 255, pos, pos-amp);
      vertex(x,y);
    }
    endShape();
    if(sound.isPlaying())
    {
      pos += delta;
    }
  }

  posRev = height - 10 * count;
  text('click to play/pause', 4, 10);
  count += 1;
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
var amp;
var delta;
var freq;
var count;
var waves;
var numWaves;

function preload(){
  sound = loadSound('drum.wav');
}

function setup(){
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT(0.8, 512);
  sound.amp(0.2);

  amp = height;
  delta = amp/50;
  freq = 4;
  count = 0;
  waves = [];
  numWaves = 50;
  background(0);
}

function draw(){
  if(sound.isPlaying())
  {
    var spectrum = fft.analyze();
    var waveform = fft.waveform();
    
    if(count % freq == 0)
    {
      background(0);
      let i = count/freq%numWaves;
      waves[i] = spectrum;
      for (var j = 0; j< waves[i].length; j++){
        waves[i][j] = waves[i][j]*waveform[j];
      }
      

      var pos = 0;
      noFill();
      beginShape();
      stroke(255,0,0); // waveform is red
      strokeWeight(1);

      // for (var j = 0; j< waves[i].length; j++){
      //   var x = map(j, 0, waves[i].length, 0, width);
      //   var y = map( waves[i][j], 0, 255, pos, pos-amp);
      //   vertex(x,y);
      // }

      var k = (i+1) % numWaves;
      do
      {
        if(k < waves.length)
        {
          for (var j = 0; j< waves[i].length; j++){
            var x = map(j, 0, waves[i].length, 0, width);
            var y = map( waves[k][j], 0, 255, pos, pos-amp);
            vertex(x,y);
        
          }
          pos += delta;
        }
        k= (k+1)% numWaves;
      }
      while(k != i)
      endShape();
    }
    
    count += 1;
  }
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
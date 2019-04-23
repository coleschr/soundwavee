var amp;
var delta;
var freq;
var count;
var waves;
var numWaves;

// ------ mesh coloring ------
var strokeColor;
var ocean;
var shore;
var sand;
var grass;
var mountain;
var peak;

var backgroundColor;

var threshold1;
var threshold2;
var threshold3;
var threshold4;
var threshold5;

var tileCount;
var zScale;

let detail = 64;

// ------ mouse interaction ------
var offsetX;
var offsetY;
var clickX;
var clickY;
var zoom;

var button;
var play;
var soundNum;
var sound;

function preload(){
  sound = loadSound('sound_files/a.mp3');
}

function setup(){
  var cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(RGB);
  cursor(CROSS);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT(0.8, detail);
  sound.amp(0.2);
  frameRate(60);
  play = true;
  soundNum = 0;

  amp = 2000;
  delta = amp/50;
  freq = 1;
  count = 0;
  waves = [];
  numWaves = 30;

  // ------ mesh coloring ------
  strokeColor = color(0, 0, 0);;
  color1 = color(0, 0, 0);
  color2 = color(145, 245, 254);
  color3 = color(255, 214, 79);
  color4 = color(111, 232, 30);
  color5 = color(177, 100, 37);
  color6 = color(0, 0, 0);
  backgroundColor = color(77, 170, 255);

  threshold1 = 0;
  threshold2 = 2;
  threshold3 = 10;
  threshold4 = 30;
  threshold5 = 50;

  tileCount = 64;
  zScale = 150;

  zoom = 300;
  
  input = createInput();
  input.position(width / 10, height / 10);

  button = createButton('change song');
  button.position(width / 10 + input.width, height / 10);
  button.mousePressed(changeSong);

  background(backgroundColor);
}

function draw(){
  if(sound.isPlaying())
  {
    background(backgroundColor);
    var spectrum = fft.analyze();
    var waveform = fft.waveform();
    if(count%freq==0)
    {
      
      ambientLight(150);

      let i = count/freq%numWaves;
      waves[i] = spectrum;
      for (var j = 0; j< waves[i].length; j++){
        waves[i][j] = waves[i][j]*waveform[j];
      }

      push();

      rotateX(PI/3);


      // 3D mesh
      for (var meshY = 0; meshY < waves.length; meshY++) {
        var curr = i-meshY;
        var prev = i-meshY-1;
        if(curr < 0)
        {
          curr += numWaves;
        }
        if(prev < 0)
        {
          prev += waves.length;
        }

        beginShape(TRIANGLE_STRIP);
        for (var meshX = 0; meshX < waves[curr].length-1; meshX++) {

          var z1 = map( waves[curr][meshX], 0, 255, 0, amp);
          var z2 = map( waves[prev][meshX], 0, 255, 0, amp);

          var interColor;
          colorMode(RGB);
          var amount;
          if (waves[curr][meshX] <= threshold1) {
            amount = map(waves[curr][meshX], -10, threshold1, 0.15, 1);
            interColor = lerpColor(color1, color2, amount);
          } else if (waves[curr][meshX] <= threshold2) {
            amount = map(waves[curr][meshX], threshold1, threshold2, 0, 1);
            interColor = lerpColor(color2, color3, amount);
          } else if (waves[curr][meshX] <= threshold3) {
            amount = map(waves[curr][meshX], threshold2, threshold3, 0, 1);
            interColor = lerpColor(color3, color4, amount);
          } else if (waves[curr][meshX] <= threshold4) {
            amount = map(waves[curr][meshX], threshold3, threshold4, 0, 1);
            interColor = lerpColor(color4, color5, amount);
          } else {
            amount = map(waves[curr][meshX], threshold4, threshold5, 0, 1);
            interColor = lerpColor(color5, color6, amount);
          } 
          fill(interColor);
          stroke(strokeColor);
          strokeWeight(1);
          //noStroke();
          // noFill();
          // stroke(interColor);
          strokeWeight(1);
          vertex(meshX*24-width/1.75, meshY*20-height/5, z1);
          vertex(meshX*24-width/1.75, (meshY+1)*20-height/5, z2);
        }
        endShape();
      }
      pop();
    }
    count++;
  }
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
    play = false;
  } else {
    sound.loop();
    play = true;
  }
}

function changeSong() {
  // ++soundNum;
  // if(soundNum >= songs.length)
  // {
  //   soundNum = 0;
  // }
  // sound = loadSound(songs[soundNum]);
  //sound = loadSound(input.value());
}












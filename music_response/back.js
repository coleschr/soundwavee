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
var color1;
var color2;
var color3;
var color4;
var color5;
var color6;
var color7;
var color8;

var threshold1;
var threshold2;
var threshold3;
var threshold4;
var threshold5;
var threshold6;

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
var sounds = [];

let bg;

function preload(){
  sounds[0] = loadSound('sound_files/Post Malone, Swae Lee - Sunflower (Spider-Man Into the Spider-Verse).mp3');
}

function setup(){
  var cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.parent("foreground");
  colorMode(RGB);
  cursor(CROSS);
  fft = new p5.FFT(0.8, detail);
  soundNum = 0;
  sounds[soundNum].amp(0.2);
  frameRate(60);
  play = true;

  amp = 500;
  delta = amp/50;
  freq = 1;
  count = 0;
  waves = [];
  numWaves = 30;

  // ------ mesh coloring ------
  strokeColor = color(255, 255, 255);
  color1 = color(0, 5, 30);
  color2 = color(145, 245, 254);
  color3 = color(255, 214, 79);
  color4 = color(111, 232, 30);
  color5 = color(177, 100, 37);
  color6 = color(70, 40, 10);
  color7 = color(255, 255, 255);
  color8 = color(0, 0, 0);
  backgroundColor = color(255, 255, 255);

  threshold1 = 0;
  threshold2 = 2;
  threshold3 = 10;
  threshold4 = 30;
  threshold5 = 50;
  threshold6 = 200;

  tileCount = 64;
  zScale = 150;

  zoom = 300;
  
  input = createInput();
  input.position(width / 10, height / 10);

  button = createButton('change song');
  button.position(width / 10 + input.width, height / 10);
  button.mousePressed(changeSong);

  play_button = createButton('play');
  play_button.position(width / 10 + input.width + button.width, height / 10);
  play_button.mousePressed(togglePlay);

  background(backgroundColor);
}

function draw(){
  if(sounds[soundNum].isPlaying())
  {
    // background(backgroundColor);
    var spectrum = fft.analyze();
    var waveform = fft.waveform();
    if(count%freq==0)
    {
      
      ambientLight(150);

      let i = count/freq%numWaves;
      waves[i] = spectrum;
      for (var j = 0; j< waves[i].length; j++){
        waves[i][j] = spectrum[j]*waveform[j];
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
        for (var meshX = 0; meshX < waves[curr].length*.75-1; meshX++) {

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
          } else if (waves[curr][meshX] <= threshold5) {
            amount = map(waves[curr][meshX], threshold4, threshold5, 0, 1);
            interColor = lerpColor(color5, color6, amount);
          } else if (waves[curr][meshX] <= threshold6) {
            amount = map(waves[curr][meshX], threshold5, threshold6, 0, 1);
            interColor = lerpColor(color6, color7, amount);
          } else {
            amount = map(waves[curr][meshX], threshold6, amp, 0, 1);
            interColor = lerpColor(color7, color8, amount);
          }

          fill(interColor);
          stroke(strokeColor);
          strokeWeight(1);
          vertex(meshX*32-width/1.75, meshY*20-height/5, z1);
          vertex(meshX*32-width/1.75, (meshY+1)*20-height/5, z2);
        }
        endShape();
      }
      pop();
    }
    count++;
  }
}

function togglePlay() {
  if (sounds[soundNum].isPlaying()) {
    sounds[soundNum].pause();
  } else {
    sounds[soundNum].loop();
  }
}

function changeSong() {
  
}













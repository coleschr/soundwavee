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
var x;
var albArt = [];
var colorList = [];
var rawColors = [];
var colorsSet = false;

let bg;

function preload(){
  sounds[0] = loadSound('sound_files/1. Bad guy - Billie Eilish.mp3');
  sounds[1] = loadSound('sound_files/2. Old town road remix - Lil Nas X, Billy Ray Cyrus.mp3');
  sounds[2] = loadSound('sound_files/3. Old town road - Lil Nas X.mp3');
  sounds[3] = loadSound('sound_files/4. Con Calma - Daddy Yankee, Snow.mp3');
  sounds[4] = loadSound('sound_files/5. SOS - Avicii, Aloe Blacc.mp3');
  sounds[5] = loadSound('sound_files/6. 7 rings - Ariana Grande.mp3');
  sounds[6] = loadSound('sound_files/7. Sunflower - Post Malone, Swae Lee.mp3');
  sounds[7] = loadSound('sound_files/8. Boy With Luv - BTS, Halsey.mp3');
  sounds[8] = loadSound('sound_files/9. Sucker - Jonas Brothers.mp3');
  sounds[9] = loadSound('sound_files/10. Talk - Khalid.mp3');
  sounds[10] = loadSound('sound_files/11. Bury a Friend - Billie Eilish.mp3');
  sounds[11] = loadSound('sound_files/12. Shallow - Lady Gaga, Bradley Cooper.mp3');
  sounds[12] = loadSound('sound_files/13. Wow. - Post Malone.mp3');
  sounds[13] = loadSound('sound_files/14. Don’t Call Me Up - Mabel.mp3');
  sounds[14] = loadSound('sound_files/15. Calma remix - Pedro Capó, Farruko.mp3');
  sounds[15] = loadSound('sound_files/16. Kill This Love - Blackpink.mp3');
  sounds[16] = loadSound('sound_files/17. Sweet but Psycho - Ava Max.mp3');
  sounds[17] = loadSound('sound_files/18. HP - Maluma.mp3');
  sounds[18] = loadSound('sound_files/19. Pa mi remix - Dalex.mp3');
  sounds[19] = loadSound('sound_files/20. Here with me - Marshmello.mp3');
  albArt[0] = "./images/billie.jpg";
  albArt[1] = "./images/oldtownroadremix.jpeg";
  albArt[2] = "./images/oldtownroad.jpeg";
  albArt[3] = "./images/concalma.jpeg";
  albArt[4] = "./images/sos.png";
  albArt[5] = "./images/7rings.png";
  albArt[6] = "./images/sunflower.jpg";
  albArt[7] = "./images/boywithluv.png";
  albArt[8] = "./images/sucker.jpg";
  albArt[9] = "./images/talk.jpg";
  albArt[10] = "./images/billie.jpg";
  albArt[11] = "./images/shallow.jpg";
  albArt[12] = "./images/wow.jpg";
  albArt[13] = "./images/dontcallmeup.jpg";
  albArt[14] = "./images/calma.jpg";
  albArt[15] = "./images/killthislove.jpg";
  albArt[16] = "./images/sweetbutpsycho.jpg";
  albArt[17] = "./images/hpmaluma.jpg";
  albArt[18] = "./images/pami.jpg";
  albArt[19] = "./images/herewithme.png";
}

function setup(){
  var cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.parent("foreground");
  colorMode(RGB);
  cursor(CROSS);
  fft = new p5.FFT(0.8, detail);
  soundNum = 6;
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
  color1 = color(0, 5, 30);
  color2 = color(145, 245, 254);
  color3 = color(255, 214, 79);
  color4 = color(111, 232, 30);
  color5 = color(177, 100, 37);
  color6 = color(70, 40, 10);
  color7 = color(255, 255, 255);
  color8 = color(0, 0, 0);
  
  changeColor(soundNum);
  backgroundColor = color(255,255,255,0);
  strokeColor = color(255,255,255);
  
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
  input.parent("foreground2");
  input.position(width / 10, height / 10);

  button = createButton('change song');
  button.parent("foreground2");
  button.position(width / 10 + input.width, height / 10);
  button.mousePressed(changeSong);

  play_button = createButton('play');
  play_button.parent("foreground2");
  play_button.position(width / 10 + input.width + button.width, height / 10);
  play_button.mousePressed(togglePlay);

  background(backgroundColor);
}

function draw(){
  if(sounds[soundNum].isPlaying() && colorsSet)
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
          vertex(meshX*64-width/1.5, meshY*30-height/6, z1);
          vertex(meshX*64-width/1.5, (meshY+1)*30-height/6, z2);
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

function changeColor(colorNum)
{
  x = document.createElement("IMG");
  x.setAttribute("src", albArt[colorNum]);
  x.setAttribute("width", 144);
  x.setAttribute("height", 144);
  x.onload = function() {
    //prominent colors extracted from image thanks to color thief (MIT License) developed by @lokesh on github!
    //https://github.com/lokesh/color-thief
    var colorThief = new ColorThief();
    rawColors = colorThief.getPalette(x, 9);
    console.log(rawColors);
    for(var i=0; i<rawColors.length; i++)
    {
      var c = color(rawColors[i][0], rawColors[i][1], rawColors[i][2]);
      colorList.push(c);
    }
    color1 = colorList[0];
    color2 = colorList[1];
    color3 = colorList[2];
    color4 = colorList[3];
    color5 = colorList[4];
    color6 = colorList[5];
    color7 = colorList[6];
    color8 = colorList[7];
    colorsSet = true;
    redraw();
  };
}

function changeSong() {
  if(input.value() > 0 && input.value() <= 20)
  {
    sounds[soundNum].stop();
    soundNum = input.value() - 1;
    changeColor(soundNum);
    sounds[soundNum].loop();
  }
}













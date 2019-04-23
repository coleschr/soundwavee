
var agents = [];
var agentCount = 4000;
var noiseScale = 300;
var noiseStrength = 10;
var overlayAlpha = 10;
var agentAlpha = 90;
var strokeWidth = 0.3;
var drawMode = 1;

function setup(){
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < agentCount; i++) {
    agents[i] = 0;
  }
}

function draw(){
  fill(255, overlayAlpha);
  noStroke();
  rect(0, 0, width, height);

  // Draw agents
  stroke(0, agentAlpha);
  for (var i = 0; i < agentCount; i++) {
    var x = getX(agents[i]);
    var y = getY(agents[i]);
    circle(2, x, y);
    update(agents[i])
    agents[i].update(noiseScale, noiseStrength, strokeWidth);
  }
}

function update(agent){

}

// keyReleased = function() {
//   if (key == '1') drawMode = 1;
//   if (key == '2') drawMode = 2;
//   if (key == ' ') {
//     var newNoiseSeed = floor(random(10000));
//     noiseSeed(newNoiseSeed);
//   }
//   if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
// };

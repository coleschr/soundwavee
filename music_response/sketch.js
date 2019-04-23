var mySound;
var button;
var ready;
var amplitude;
var mic;


function setup() {
    createCanvas(windowWidth, windowHeight);
    mySound = loadSound("Credits2M.mp3", loaded);
    button = createButton('Play');
	button.position( windowWidth/2, windowHeight/2);
	button.mousePressed(playPause);
	amplitude = new p5.Amplitude();
	fft = new p5.FFT();
	mic = new p5.AudioIn()
  	mic.start();
}

function loaded(){
	ready = true;
}

function playPause(){
	if(ready)
	{
		if(mySound.isPlaying())
		{
			mySound.pause();
		}
		else
		{
			mySound.setVolume(0.4);
			mySound.play();
		}
	}
}

function draw() {
	var spectrum = fft.analyze();
	background(0);
	//var level = amplitude.getLevel();
	//var height = map(level, 0, 1, 0, 200);
	for(var i = 1; i < 20; i++)
	{
		var height = fft.getEnergy(440 * pow(2, i/12), 440 * pow(2, (i+1)/12));
		circle(windowWidth*i/20, 300 - height, 10);
	}

	micLevel = mic.getLevel();
  	ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);
}




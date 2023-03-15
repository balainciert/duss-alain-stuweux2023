var socket;
var outDiam = 0;
let circleClicked = 0;
let clickPosX, clickPosY;
let offsetbeginX;
var sound;
let opacityCol;
let lineWeight;
let waves = [];
let num_waves; //no waves on the canvas at first
let gradientBlue;
let gradientGreen;
//let waveColor;

let settings = {};

function setup() {
    createCanvas(windowWidth, windowHeight);
    //colorMode(HSB, 100);
    colorMode(RGB, 255);
    settings.w = width;
    sound1 = loadSound("queen.mov", loaded);
    sound2 = loadSound("gay.mov", loaded);
    sound3 = loadSound("go.mov", loaded);
    sound4 = loadSound("salad.mov", loaded);

    socket = io.connect("http://localhost:3000/");

    socket.on("click", newCircle);

    socket.emit("get", settings);
    socket.on("get", getSettings);

    //background(60, 20, 100);
    background(179, 228, 255);
}

function loaded() { }

function getSettings(data) {
    settings = data;
    console.log(settings);
}


function newCircle(data) {
    clickPosX = data.x;
    clickPosY = data.y;
    circleClicked = 1;

    outDiam = 0;

    let mywave = new Wave(data.x, data.y);
    waves.push(mywave);
}

function touchStarted() {

    let randomSound = Math.random();
    console.log(randomSound);
    if (randomSound < 0.25) {
        sound1.play();
    }

    else if (randomSound < 0.5) {
        sound2.play();
    }

    else if (randomSound < 0.75) {
        sound3.play();
    }

    else {
        sound4.play();
    }


    var data = {
        x: mouseX + settings.offsetbeginX,
        y: mouseY
    }
    socket.emit("click", data);
}

function draw() {

    //gradientBlue = map(clickPosY, 255, windowHeight, 255, 80);
    //gradientGreen = map(clickPosY, 255, windowHeight, 255, 100);

    //background(10, gradientGreen, gradientBlue, 10);
    //background(60, 20, 100);
    background(179, 228, 255);

    //let volumeSound = map(mouseX, 0.1, width, 0.1, 1);
    //sound.amp(volumeSound);

    //let speedSound = map(mouseY, 2, height, 2, 0.5);
    //sound.rate(speedSound);

    for (const wav of waves) wav.display();

}

class Wave {
    constructor(clickPosX, clickPosY) {
        this.x = clickPosX;
        this.y = clickPosY;
        this.outDiam = 0;
        //this.waveColor = 0;
    }

    display() {

        if (circleClicked) {

            push();
            translate(-settings.offsetbeginX, 0);

            /*for (let count = 0; count < 5; count++) {
                let diam = this.outDiam - 80 * count;
                if (diam > 0) {
                    noFill();
                    //opacityCol = map(diam, 0, width * 2, 200, 0);
                    lineWeight = map(diam, 0, width * 2, 28, 0);
                    stroke(this.waveColor, 80, 100);
                    
                    strokeWeight(lineWeight);
                    ellipse(this.x, this.y, diam);
                    this.waveColor += 20;
                }
                //this.waveColor += 20;
            }
            
            for (let waveColor = 0; waveColor < 6; waveColor++) {
                let diam = this.outDiam - 80 * waveColor;
                if (diam > 0) {
                    noFill();
                    //opacityCol = map(diam, 0, width * 2, 200, 0);
                    lineWeight = map(diam, 0, width * 2, 40, 0);
                    stroke(waveColor*16, 90, 85);
                    strokeWeight(lineWeight);
                    ellipse(this.x, this.y, diam);
                }
            }*/

            for (let waveColor = 0; waveColor < 6; waveColor++) {
                let diam = this.outDiam - 80 * waveColor;
                if (diam > 0) {
                    noFill();
                    lineWeight = map(diam, 0, width * 15, 50, 0);
                    if (waveColor < 1) {
                        stroke(228, 3, 3);

                    }
                    else if (waveColor < 2) {
                        stroke(255, 140, 0);

                    }
                    else if (waveColor < 3) {
                        stroke(255, 237, 0);

                    }
                    else if (waveColor < 4) {
                        stroke(0, 128, 38);
                    }
                    else if (waveColor < 5) {
                        stroke(0, 77, 255);
                    }
                    else {
                        stroke(117, 7, 135);
                    }
                    strokeWeight(lineWeight);
                    ellipse(this.x, this.y, diam);
                }
            }

        
            this.outDiam = this.outDiam + 10;
            pop();
        }
    }
}
var socket;


function setup() {
    createCanvas(2000,2000);
    background(0);

    socket = io.connect('http://localhost:3000');
    socket.on('mouse', newDrawing);
}

function newDrawing(data) {
    noStroke();
    fill(255, random(125,255), 255);
    triangle(600, 1500, 1200, 300, data.x, data.y);
}

function mouseDragged() {
    console.log('Sending: ' + mouseX + ',' + mouseY);

    var data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse', data);

    noStroke();
    fill(random(0,125), 0, 255);
    triangle(mouseX, mouseY, 600, 300, 1200, 700);
}

function draw() {
    //ellipse(mouseX, mouseY, 60, 60);
}
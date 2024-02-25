// elements html
let elBarLife;
let elBody;
let elCanvas;

let mazeCanvas;
let rows, cols;
let targetW = 10;
var w;
// var w = Math.round(window.innerHeight / 18 * 100) / 100;
var grid = [];
var current;
var stack = [];
// var playerStack = [];
let mazeIsDrawing = true;
let playBtn = true;

let currentR = 186;
let currentG = 0;
let currentB = 23;

let gridCurrentIndex = 0;
let player;
let ennemies = []
let nbrOfennemies = 20;
let bombs = [];

let wallWeight = 8
let scaleCanvas = 1 //1.5

let finalPoint;
let gameDuration = 0;

function preload() {
    elBarLife = document.getElementById('lifebar')
    elBody = document.getElementsByTagName('body')[0]
}
function incrementDuration() {
    gameDuration++
}
function setup() {
    hideEndgamePanel()
    gameDuration = 0;
    setInterval(incrementDuration, 1000);

    w = (Math.round(window.innerHeight / targetW * 100) / 100) * scaleCanvas;
    createPlayer()
    // mazeCanvas = createCanvas(windowWidth * scaleCanvas, windowHeight * scaleCanvas);
    mazeCanvas = createCanvas(windowWidth, windowHeight, WEBGL);

    // mazeCanvas = createCanvas(windowWidth * scaleCanvas, windowHeight * scaleCanvas, WEBGL);
    mazeCanvas.background(0);
    elCanvas = document.getElementsByTagName('canvas')[0]
    if (elCanvas.classList.contains('unScaleCanvas')) {
        console.log('true');
        elCanvas.classList.remove('unScaleCanvas')
    }
    // document.getElementsByClassName("shadow")[0].style.opacity = 1;

    cols = floor(width / w);
    rows = floor(height / w);
    randomColor();
    //set up the grid
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell)
        }
    }
    current = grid[grid.length - 1];
    while (mazeIsDrawing) {
        current.visited = true;
        var next = current.checkNeighbors();
        if (next) {
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
        else {
            mazeIsDrawing = !mazeIsDrawing;
        }
    }
    printMaze()

    // for (let i = 0; i < nbrOfennemies; i++) {
    //     createEnnemies()
    // }
    // finalPoint = new Thing(w * cols - 1 - w * 0.5, w * rows - 1 - w * 0.5)
    // finalPoint.position = grid.length - 1

    // loop()
}

function draw() {
    if (playBtn && player.life > 0) {

        clear()
        printMaze()


        // background(250);

        // translate(-240, -100, 0);
        // normalMaterial();

        // translate(240, 0, 0);


        // push();
        // rotateY(21);
        // // rotateX(0);
        // // rotateY(25);
        // plane(70);
        // pop();

        // push();
        // rotateZ(frameCount * 0.01);
        // rotateX(frameCount * 0.01);
        // rotateY(frameCount * 0.01);
        // box(70, 70, 70);
        // pop();

        // gridCurrentIndex = player.detectGridPosition()
        // grid[gridCurrentIndex].isPlayerPosition = true

        // player.drawPerso()

        // bombs.forEach((bomb) => {
        //     bomb.drawMine()
        // });
        // ennemies.forEach((ene, index) => {
        //     ene.move()
        //     ene.drawPerso()
        //     ene.detectGridPosition();
        //     if (player.touch(ene)) {
        //         ene.kill(ennemies, index)
        //         player.life -= 10
        //         elBarLife.style.width = player.life + '%'
        //     }
        //     for (let i = 0; i < bombs.length; i++) {
        //         if (ene.touch(bombs[i])) {
        //             console.log("BOOM");
        //             ene.kill(ennemies, index)
        //             bombs[i].kill(bombs, i)
        //         }
        //     }
        // });
        // finalPoint.drawThing()
        // if (player.touch(finalPoint)) {
        //     endGame()
        // }
        // keyPressed()

        // updateFront()
    } else endGame()
}
function endGame() {
    document.getElementsByClassName('shadow')[0].style.opacity = 0
    elCanvas.classList.toggle('unScaleCanvas')
    noLoop()
    // playBtn = !playBtn
    document.getElementById('timeEl').textContent = gameDuration
    showEngGamePanel()
}

function createPlayer() {
    player = new Personnages(w * 0.5, w * 0.5)
    player.size = w * 0.5
    player.speed = w * 0.15
    player.color = [currentR, currentG, currentB]
    player.strokecolor = [currentR - 20, currentG, currentB]
}

function updateFront() {
    elBody.style.setProperty('--canvas-x', ((windowWidth * 0.5) - player.x) + 'px')
    elBody.style.setProperty('--canvas-y', ((windowHeight * 0.5) - player.y) + 'px')
}

function keyPressed() {
    if (keyIsDown(UP_ARROW)) {
        player.goUp()
    } else if (keyIsDown(DOWN_ARROW)) {
        player.goDown()
    } else if (keyIsDown(LEFT_ARROW)) {
        player.goLeft()
    } else if (keyIsDown(RIGHT_ARROW)) {
        player.goRight()
    }
}
function keyReleased() {
    if (keyCode === 32) {
        const index = bombs.findIndex((element) => element.position === player.position)
        if (index === -1) {
            bombs.push(new Mine(player.x, player.y, player.position))
            // let currentGr = grid[player.position]
            // bombs[bombs.length - 1].improvePlayerPositionH(currentGr.i)
            // bombs[bombs.length - 1].improvePlayerPositionV(currentGr.j)
        } else {
            bombs.splice(index, 1)
        }
    }
}
function createEnnemies() {
    let nextX = random(0, cols - 1)
    let nextY = random(0, rows - 1)
    let ennemie = new Personnages(w * nextX + w * 0.5, w * nextY + w * 0.5)
    ennemie.size = w * 0.5
    ennemie.speed = w * 0.03
    ennemies.push(ennemie)
    ennemie.detectGridPosition()
}

function playPause() {
    playBtn = !playBtn
    if (playBtn) {
        btnPlaypause.html('&#10074;&#10074;')
    } else {
        btnPlaypause.html('&#x23f5;')
    }
}
function restartMaze() {
    grid = [];
    stack = [];
    // playerStack = []
    mazeIsDrawing = true;
    setup();
}
function randomColor() {
    currentR = Math.floor(random(0, 255));
    currentB = Math.floor(random(0, 255));
    currentG = Math.floor(random(0, 255));
}
function printMaze() {
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}
function removeWalls(a, b) {
    var x = a.i - b.i;
    var y = a.j - b.j;
    //left = 1 right -1
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    //TOP = 1 bottom -1
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function resetGame() {
    grid = [];
    stack = []
    // playerStack = []
    ennemies = []
    bombs = []
    current = null
    mazeIsDrawing = true
    gridCurrentIndex = null
    setup()
}
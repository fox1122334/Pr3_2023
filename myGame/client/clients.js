let matrix = [];


function main() {
    const socket = io();

    let button = document.getElementById("button");
    console.log("ready to display game ...")

    function gotMatrixData(data) {
        console.log(data);
        zeichneMatrix()
        matrix = data;
    }
    socket.on("matrix", gotMatrixData)

    button.onclick = tickspeed
}

function setup() {
    createCanvas(500, 500);
}

// Matrix zeichnen
function zeichneMatrix() {
    console.log ("matrix zeichnen")
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            // console.log(matrix[y][x])
            // let r = randomNumber(0, 255)
            // let g = randomNumber(0, 255)
            // let b = randomNumber(0, 255)
            if (matrix[y][x] === 0) {
                fill("#f2d491")
            } else if (matrix[y][x] === 1) {
                fill("green")
            } else if (matrix[y][x] === 2) {
                fill("yellow")
            } else if (matrix[y][x] === 3) {
                fill("purple")
            } else if (matrix[y][x] === 4) {
                fill("white")
            } else if (matrix[y][x] === 5) {
                fill(r, g, b)
            } else if (matrix[y][x] === 6) {
                fill("red")
            } else {
                fill("black")
            }
            rect(x * (500 / matrix.length), y * (500 / matrix.length),
                (500 / matrix.length), (500 / matrix.length))
        }
    }
}


window.onload = main();

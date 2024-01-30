let matrix = [];
let side = 10;

function main() {
    const socket = io();

    console.log("ready to display game ...")

    function gotMatrixData(data) {
        console.log(data);
        matrix = data;
    }
    socket.on("matrix", gotMatrixData)


    function setup() {
        createCanvas(500, 500);
    }

    // Matrix zeichnen
    function zeichneMatrix() {
        for (let z = 0; z < matrix.length; z++) {
            for (let s = 0; s < matrix.length; s++) {
                // console.log(matrix[z][s])
                let r = randomNumber(0, 255)
                let g = randomNumber(0, 255)
                let b = randomNumber(0, 255)
                if (matrix[z][s] === 0) {
                    fill("#f2d491")
                } else if (matrix[z][s] === 1) {
                    fill("green")
                } else if (matrix[z][s] === 2) {
                    fill("darkgrey")
                } else if (matrix[z][s] === 3) {
                    fill("red")
                } else if (matrix[z][s] === 4) {
                    fill("white")
                } else if (matrix[z][s] === 5) {
                    fill(r, g, b)
                } else if (matrix[z][s] === 6) {
                    fill("turquoise")
                } else {
                    fill("black")
                }
                rect(s * (500 / matrix.length), z * (500 / matrix.length),
                    (500 / matrix.length), (500 / matrix.length))
            }
        }
    }

}

window.onload = main();
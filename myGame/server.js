const Grass = require("./classes/grass.js");
const Grazer = require("./classes/grazer.js");
const Predator = require("./classes/predator.js");
const Fire = require("./classes/fire.js")
//const functions = require("./classes/functions.js");

///////// Server Setup ///////////
const express = require("express");
const app = express();

app.use(express.static("./client/"))

app.get("/", function (req, res) {
    res.redirect("index.html")
});

let server = require('http').Server(app);
let io = require('socket.io')(server);

let clients = [];
let isGameRunning = false;
let interValID;

let tickspeed = 400;


server.listen(3000, function () {
    console.log("Der Server läuft auf port 3000...");

    io.on("connection", function (socket) {
        console.log("ws connection established...");
        clients.push(socket.id);

        //Spielstart
        if (clients.length == 1 && isGameRunning == false) {
            console.log("Starte Spiel... wenn noch nicht gestartet...")
            initGame()
            //Spielschleife
            interVaLID = setInterval(updateGame, tickspeed);
            isGameRunning = true
        }
        //wenn Client verlässt
        socket.on("disconnect", function () {
            console.log("client left...");
            const foundIndex = clients.findIndex(id => id === socket.id);
            if (foundIndex >= 0) {
                clients.splice(foundIndex, 1)
            }
            if (clients.length === 0) {
                isGameRunning = false;
                clearInterval(interVaLID);
                console.log("Spiel gestopt: keine Clients", clients.length)
            }
        })
    })
});


///////// game logic on server ////////
matrixKlein = [
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 1, 0, 3, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]
];

module.exports = grassArr = [];
module.exports = grazerArr = [];
module.exports = predatorArr = [];
module.exports = fireArr = [];

function getRandMatrix(cols, rows) {
    let matrix = [];
    for (let y = 0; y <= rows; y++) {
        matrix.push([]);
        for (let x = 0; x <= cols; x++) {
            matrix[y][x] = Math.floor(Math.random() * 2);
        }
    }
    return matrix;
}

function addMoreCreatures() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (y == x) {
                if (y % 2 == 0) matrix[y][x] = 2;
                //else matrix[y][x] = 2;
            }
        }
    }
}

function initGame() {
    console.log('init game....');
    matrix = getRandMatrix(50, 50);
    //addMoreCreatures();
    matrix[20][20] = 4;

    // durch Matrix laufen und Lebewesen erstellen
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grassObj = new Grass(x, y);
                grassArr.push(grassObj);
            } else if (matrix[y][x] == 2) {
                let grazerObj = new Grazer(x, y);
                grazerArr.push(grazerObj);
            } else if (matrix[y][x] == 3) {
                let predatorObj = new Predator(x, y);
                predatorArr.push(predatorObj);
            } else if (matrix[y][x] == 4) {
                let fireObj = new Fire(x, y);
                fireArr.push(fireObj);
            }
        }
    }
    console.log("Sende matrix zu clients")
    io.sockets.emit('matrix', matrix);
}

function updateGame() {
    console.log("update game...");
    for (let i = 0; i < grassArr.length; i++) {
        let grassObj = grassArr[i];
        grassObj.mul();
    }

    for (let i = 0; i < grazerArr.length; i++) {
        let grazerObj = grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();

    }
    for (let i = 0; i < predatorArr.length; i++) {
        let predatorObj = predatorArr[i];
        predatorObj.move();
        predatorObj.eat();
        predatorObj.mul();

    }
    for (let i = 0; i < fireArr.length; i++) {
        let fireObj = fireArr[i];
        fireObj.mul();

    }
    // console.log(matrixKlein);
    console.log("sende matrix zu clients...");
    io.sockets.emit('matrix', matrix);
}
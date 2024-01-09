const Grass = require("./classes/grass.js");
const Grazer = require("./classes/grazer.js");
const Predator = require("./classes/predator.js");

const express = require("express");
const { ClientRequest } = require("http"); 
const app = express();

app.use(express.static("./client"))

app.get("/", function(req, res) {
    res.redirect("index.html")
});

let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(3000, function(){
    console.log("Der Server läuft auf port 3000...");

    io.on("connection", function (socket) {
        console.log("ws connection established...");
        clients.push(socket.id);
        //Spielstart
        if (clients.length == 1 && isGameRunning == false) {
            console.log("Starte Spiel... wenn noch nicht gestartet...")
            initGame()
            interVaLID = setInterval(updateGame, 1000);
            isGameRunning = true
        }
        socket.on("disconnect", function() {
            console.log("client left...");
            const foundIndex = clients.findIndex(id =>id === socket.id);
            if (foundIndex >= 0){
                clients.splice(foundIndex, 1)
            }
            if (clients.length === 0){
                isGameRunning = false;
                clearInterval(interVaLID);
                console.log("Spiel gestopt: keine Clients", clients.length)
            }
        })
    }
}

// game logic on server
// matrix = [
//     [0, 0, 1, 0, 0],
//     [1, 1, 0, 0, 0],
//     [0, 1, 0, 3, 0],
//     [0, 0, 1, 0, 0],
//     [1, 1, 0, 2, 0],
//     [1, 1, 0, 2, 0],
//     [1, 1, 0, 0, 0]
//  ];

// grassArr = [];
// grazerArr = [];
// predatorArr =[];

// function getRandMatrix(cols, rows){
//     let matrix = [];
//     for(let y = 0; y <= rows; y++){
//         matrix.push([]);
//         for(let x = 0; x <= cols; x++){
//             matrix[y][x] = Math.floor(Math.random() * 2);
//         }
//     }
//     return matrix;
// }

// function addMoreCreatures(){
//     for (let y = 0; y < matrix.length; y++) {
//         for (let x = 0; x < matrix[y].length; x++) {
//             if(y == x){
//                 if(y % 2 == 0) matrix[y][x] = 3;
//                 else matrix[y][x] =2;
//             }
//         }
//     }
// }


// function initGame(){
//     console.log('init game....');
//     matrix = getRandMatrix(50,50);
//     addMoreCreatures();

//     // durch Matrix laufen und Lebewesen erstellen
//     for (let y = 0; y < matrix.length; y++) {
//         for (let x = 0; x < matrix[y].length; x++) {
//             if(matrix[y][x] == 1){
//                 let grassObj = new Grass(x,y);
//                 grassArr.push(grassObj);
//             }else if(matrix[y][x] == 2){
//                 let grazerObj = new Grazer(x,y);
//                 grazerArr.push(grazerObj);
//             }else if(matrix[y][x] == 3){
//                 let predatorObj = new Predator(x,y);
//                 predatorArr.push(predatorObj);
//             } 
//         }   
//     }
// }

// function updateGame(){
//     console.log("update game...");
//     for(let i = 0; i < grassArr.length; i++){
//         let grassObj = grassArr[i];
//         grassObj.mul();
//     }

//     for(let i = 0; i < grazerArr.length; i++){
//         let grazerObj = grazerArr[i];
//         grazerObj.eat();
//         grazerObj.mul();

//     }
//     //console.log(matrix);
// }
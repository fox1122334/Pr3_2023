const utils = require("./functions.js");
const LivingCreature = require("./livingCreature.js");
module.exports = class Fire extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        // Farbe - rot
        this.colorValue = 4;
        this.roundCount = 0;
        this.notSpread = 0;
    }
    mul() {
        // counter > 3 , dann vermehren
        this.roundCount++;
        if (this.roundCount >= 3) {
            let emptyFields = this.findFields(1);
            if (emptyFields.length > 0) {
                let randomIndex = Math.floor(Math.random() * emptyFields.length);
                let newPos = emptyFields[randomIndex]; // [x,y]
                let newX = newPos[0];
                let newY = newPos[1];
                grassArr.push(new Fire(newX, newY));
                matrix[newY][newX] = this.colorValue;
            }
            this.roundCount = 0;
        }
        else {
            this.notSpread++;
            this.roundCount = 0;
            if (this.notSpread >= 3) {
                this.die();
                this.exstinguish()
                console.log("dieeeee")
            }

        }
        exstinguish() {
            console.log("die")
            matrix[this.y][this.x] = 0;
            utils.removeFromList(this, fireArr);
        }
    }
}
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
 
    spread() {
        this.roundCount++;
        console.log("fire")
        if (this.roundCount >= 2) {
            console.log("spread")
            let pos = utils.findRandomPosFor(this, 1);
            if (pos !== undefined) {
                fireArr.push(new Fire(pos[0], pos[1]));
                matrix[pos[1]][pos[0]] = this.colorValue;
                this.x = pos[0]
                this.y = pos[1]
                utils.removeFromList(this, grassArr);
            }
            this.roundCount = 0;
        }
        else {
            this.notSpread++;
            if (this.notSpread >= 5) {
                this.extinguish()
                console.log("dieeeee")
            }

        }
    }
    // eat() {
    //     let fields = this.findFields(1);
    //     if (fields.length > 0) {
    //         let randomIndex = Math.floor(Math.random() * fields.length);
    //         let pos = fields[randomIndex];
    //         this.updateGameAndPos(pos[0], pos[1]);
    //         utils.removeFromList(this, grassArr); // Gras löschen

    //         this.eatCount++;
    //         this.notEaten = 0;
    //         //this.mul();

    //     } else {
    //         this.notSpread++;
    //         if (this.notSpread >= 10) {
    //             this.extinguish()
    //             console.log("dieeeee")
    //         }
    //     }
    // }


    extinguish() {
        console.log("die")
        matrix[this.y][this.x] = 0;
        utils.removeFromList(this, fireArr);
    }


    lightning(){
    
    }
    

}

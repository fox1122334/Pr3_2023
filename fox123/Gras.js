class Gras extends LivingCreature{
    energie = 0;

 
    inMatrixEinfügen(){
        matrix[this.zeile][this.spalte] = 1
    };

    spielzug(){
        //Geschwindigkeit des Graswachstums
        if (this.energie > 4){
            this.energie = 0
            this.plantGras();
            //mach etwas
        }else {
            //schlaf
            this.energie++;
        }
    };

    plantGras(){
        let erdeFelder = this.erstelleErdeTabelle()
        if (erdeFelder.length > 0){
            let gewähltesFeld = erdeFelder[Math.floor(random(0,erdeFelder.length))];
             let newGras = new Gras(gewähltesFeld[0],gewähltesFeld[1]);
             newGras.inMatrixEinfügen();
             objektliste.push(newGras);
        }

    };

    ;

    istErde(koordinatenPaar){
        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0
            && spalte >= 0
            && zeile < matrix.length
            && spalte < matrix.length
            && matrix[zeile][spalte] === 0
            ) {
                return true;

            } else {
                return false;
            }
        }
}
class Gras {
    zeile;
    spalte;
    energie = 0;

    constructor(z,s){
        this.zeile = z
        this.spalte = s
    }
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

    erstelleErdeTabelle(){
        let benachbarteFelder =[
        [this.zeile+1,this.spalte],
        [this.zeile-1,this.spalte],
        [this.zeile,this.spalte+1],
        [this.zeile,this.spalte-1],
        [this.zeile+1,this.spalte+1],
        [this.zeile-1,this.spalte-1],
        [this.zeile-1,this.spalte+1],
        [this.zeile+1,this.spalte-1]
        ]
        return benachbarteFelder.filter(this.istErde)
    };

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
class Grasfresser {
    zeile;
    spalte;
    energie = 15;
    constructor(z,s){
        this.zeile = z
        this.spalte = s
    }



    inMatrixEinfügen(){
        matrix[this.zeile][this.spalte] = 3
    };

    spielzug(){
        if (this.energie > 30){
            this.energie = 15;
            this.plantGrasfresser()

        }
        else if (this.energie > 0){
            this.Schritt()
            let gras = this.erstelleGrasTabelle()
            if (gras.length > 0){
                this.energie++
            }
            else {
                this.energie--
            }
        } else {
            //stirb
            console.log ("tot")
            matrix [this.zeile][this.spalte] = 0;
            this.ObjektLöschen(this.zeile,this.spalte)
        }
    };

    plantGrasfresser(){
        let grasFelder = this.erstelleGrasTabelle()
        if (grasFelder.length > 0){
            let gewähltesFeld = grasFelder[0];
            this.ObjektLöschen(gewähltesFeld[0],gewähltesFeld[1])
             let newGrasfresser = new Grasfresser(gewähltesFeld[0],gewähltesFeld[1]);
             newGrasfresser.inMatrixEinfügen();
             objektliste.push(newGrasfresser);
        }

    };

    Schritt(){
        let gras = this.erstelleGrasTabelle()
        if (gras.length > 0){
            let gewähltesFeld = gras[Math.floor(random(0,gras.length))];
            matrix[this.zeile][this.spalte] = 0;
            this.ObjektLöschen(gewähltesFeld[0],gewähltesFeld[1])

            this.zeile = gewähltesFeld[0];
            this.spalte = gewähltesFeld[1];
            matrix[this.zeile][this.spalte] = 3;
        }
        // else
        // console.log ("Fertig, Meister")
    };

    ObjektLöschen(zeile,spalte){
        let index =objektliste.findIndex(function(gras){
            if (gras.zeile === zeile && gras.spalte === spalte){
                return true
            } else {
                return false
            }
        })
         objektliste.splice(index,1)
    };

    erstelleGrasTabelle(){
        let benachbarteFelder =[
        [this.zeile+1,this.spalte],
        [this.zeile-1,this.spalte],
        [this.zeile,this.spalte+1],
        [this.zeile,this.spalte-1],
        // Rasendestroyer auch quer bewegen
        // [this.zeile+1,this.spalte+1],
        // [this.zeile-1,this.spalte-1],
        // [this.zeile-1,this.spalte+1],
        // [this.zeile+1,this.spalte-1],
        ]
        return benachbarteFelder.filter(this.istGras)
    };

    istGras(koordinatenPaar){
        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0
            && spalte >= 0
            && zeile < matrix.length
            && spalte < matrix.length
            && matrix[zeile][spalte] === 1
            ) {
                return true;

            } else {
                return false;
            }
    };
}
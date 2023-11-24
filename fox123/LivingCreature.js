class LivingCreature {
    zeile;
    spalte;

    constructor(z,s){
        //Position
        this.zeile = z
        this.spalte = s
    
//Nachbarfelder anschauen
    this.directions =[
        [this.zeile+1,this.spalte],
        [this.zeile-1,this.spalte],
        [this.zeile,this.spalte+1],
        [this.zeile,this.spalte-1],
        [this.zeile+1,this.spalte+1],
        [this.zeile-1,this.spalte-1],
        [this.zeile-1,this.spalte+1],
        [this.zeile+1,this.spalte-1]
        ]
        return directions.filter(this.istErde)
    }
}
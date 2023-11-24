//Objekt Test

let obj = {
    first_name: "Max",
    last_name: "Mustermann",

    sayName (){
        console.log("Hi, mein Name ist", this.first_name, this.last_name)
    }
}
obj.sayName();

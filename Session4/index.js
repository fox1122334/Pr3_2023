const os = require ("os");
const { mainModule } = require("process");

let message = "The operation system is "

function main (){
    console.log(message + os.platform());

}
main()
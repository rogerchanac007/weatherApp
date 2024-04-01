const {inquirerInput, inquirerMenu, inquirerPausa } = require("./helpers/inquirer")
const Busqueda = require("./models/busquedas")
require("colors")
require("dotenv").config()
const main = async ()=>{
    const busqueda = new Busqueda();
    let opcion;
    do{
        opcion = await inquirerMenu();
        switch(opcion){
            case 1:
                const lugar = await inquirerInput("Ingrese el nombre de la ciudad:");
                busqueda.obtenerCiudades(lugar)
                console.log(lugar)
                console.log("Informacion de la ciudad".green)
                console.log("Ciudad:")
                console.log("Latitud:")
                console.log("Longitud:")
                console.log("Temperatura:")
                console.log("Minima:")
                console.log("Maxima:")
                await inquirerPausa()
            break;
        }
    }while(opcion!==0)
    
}

main();
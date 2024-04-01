const {inquirerInput, inquirerMenu, inquirerPausa, listarLugares } = require("./helpers/inquirer")
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
                const ciudades = await busqueda.obtenerCiudades(lugar)
                const ciudad = await listarLugares(ciudades)
                const lugarSelccionado = ciudades.find(i => i.id === ciudad)
                console.log("Informacion de la ciudad".green)
                console.log(`${"Ciudad.".blue} ${lugarSelccionado.place_name}`)
                console.log(`${"Latitud:".blue} ${lugarSelccionado.geometry.coordinates[0]}`)
                console.log(`${"Longuitud:".blue} ${lugarSelccionado.geometry.coordinates[1]}`)
                console.log("Temperatura:")
                console.log("Minima:")
                console.log("Maxima:")
                await inquirerPausa()
            break;
        }
    }while(opcion!==0)
    
}

main();
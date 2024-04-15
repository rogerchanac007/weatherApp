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
                if(ciudad === "0") continue;
                const lugarSelccionado = ciudades.find(i => i.id === ciudad)
                busqueda.agregarHistorial(lugarSelccionado.place_name)
                const clima = await busqueda.obtenerClima(lugarSelccionado.geometry.coordinates[1], lugarSelccionado.geometry.coordinates[0])
                console.log("Informacion de la ciudad".green)
                console.log(`${"Ciudad.".blue} ${lugarSelccionado.place_name}`)
                console.log(`${"Latitud:".blue} ${lugarSelccionado.geometry.coordinates[1]}`)
                console.log(`${"Longuitud:".blue} ${lugarSelccionado.geometry.coordinates[0]}`)
                console.log(`${"Clima:".blue} ${clima.main.temp}`)
                console.log(`${"Minima:".blue} ${clima.main.temp_min}`)
                console.log(`${"Maxima:".blue} ${clima.main.temp_max}`)
                console.log(`${"Estado:".blue} ${clima.weather[0].main}`)
                await inquirerPausa()
            break;
            case 2:
                busqueda.historial.forEach((lugar, indice)=>{
                    const idx = `${indice + 1}`.green
                    console.log(`${idx} ${lugar}`)
                })
                await inquirerPausa()
            break;
        }
    }while(opcion!==0)
    
}

main();
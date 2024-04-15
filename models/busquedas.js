const fs = require("fs")
const axios = require("axios")

class Busqueda{
    historial = []
    dbpath = "./db/database.json"

    constructor(){
        this.leerDB()
    }

    get historialCapitalizado(){
        
    }

    async obtenerCiudades(lugar=''){
        const instancia = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params:{
                access_token:process.env.MAPBOX_KEY,
                limit:5,
                languaje:"es"
            }
        })
        const resp = await instancia.get()
        return resp.data.features
        
    }

    async obtenerClima(lat="", long=""){
        try{
            const instancia = axios.create({
                baseURL:"https://api.openweathermap.org/data/2.5/weather?",
                params:{
                    lat:lat,
                    lon:long,
                    appid:process.env.OPENWEATHER_KEY,
                    units:"metric",
                    lang:"es",
                }
            })
            const resp = await instancia.get()
            return resp.data
        }
        catch(err){
            console.log(err)
        }
    }

    agregarHistorial(lugar=""){
        if (this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.historial.unshift(lugar.toLocaleLowerCase());
        
        //Grabar en db
        this.guardarDB()
    }

    guardarDB(){
        const payload = {
            historial:this.historial,
        }

        fs.writeFileSync(this.dbpath, JSON.stringify(payload))
    }

    leerDB(){
        if(fs.existsSync(this.dbpath)){
            const info = fs.readFileSync(this.dbpath, {encoding:"utf-8"});
            const data = JSON.parse(info)
            this.historial = data.historial
        }
    }
}

module.exports = Busqueda
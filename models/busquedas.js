const axios = require("axios")

class Busqueda{
    historial = []

    constructor(){

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
}

module.exports = Busqueda
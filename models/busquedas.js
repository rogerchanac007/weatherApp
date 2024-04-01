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
}

module.exports = Busqueda
const axios = require("axios")

class Busqueda{
    historial = []

    constructor(){

    }

    async obtenerCiudades(lugar=''){
        const instancia = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params:{
                access_token:"pk.eyJ1IjoicmNoYW4wMDciLCJhIjoiY2x1ZzBzd2k4MjhuczJ0b2V3YzBncHlzbyJ9.AGllrvq_lI_cmY32XyQJ5Q",
                limit:5,
                languaje:"es"
            }
        })
        const resp = await instancia.get()
        console.log(resp.data)
        return []
    }
}

module.exports = Busqueda
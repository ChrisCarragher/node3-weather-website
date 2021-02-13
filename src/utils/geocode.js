const request = require('postman-request')

const geocode = (address, callback) => {
    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiMTRjaHJpczIwMTEiLCJhIjoiY2tsMWs3MGNxMGV0cjJ3cWkzYm81MHRmaiJ9.MZAJnWh4LZxtNn6A6Vp1eg&limit=1`
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the location service')
        }else if (body.features.length === 0){
            callback('Unable to get location, try again')
        }else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode
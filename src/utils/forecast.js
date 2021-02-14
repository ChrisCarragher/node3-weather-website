const request = require('postman-request')


const forecast = (latitude, longitude, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=bb342ee7426b976fc1f0ff2be2b3ce6b&query=${latitude},${longitude}&units=m`
    request({ url, json:true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to the Weather service') 
        } else if (body.error){
            callback('Unable to get the Weather')
        }else {
            //console.log(body.current)
            const {temperature, feelslike, humidity} = body.current
            //console.log(response.body.location.region)
            let description = `It is ${body.current.weather_descriptions}`
            callback(undefined, `It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. Todays humidity is ${humidity}%. ${description}`)
        }
    })
}


module.exports = forecast
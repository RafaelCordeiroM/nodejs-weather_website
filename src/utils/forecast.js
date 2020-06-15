const request = require('request')
const forecast = ({ lat: latitude, lon: longitude } = {}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1e48adf3ad1c7ba02613aebcf7d3d224&query=${longitude},${latitude}`
    request({ url, json: true }, (error, { body }) => {

        if (error) callback("Unable to connect", undefined)
        else if (body.error) callback('coordinates was not matched', undefined)
        else callback(undefined, body)

    })

}

module.exports = forecast
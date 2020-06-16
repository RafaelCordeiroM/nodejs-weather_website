const request = require('request')
const geocode = (address, callback) => {
    if (!address) return console.log("provide a address")
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFmYWVsY21hcnRpbnMiLCJhIjoiY2tiZThtemlrMGpmNzJvbXVwcWl0cmQ5dSJ9.gmLCgVAjxHnScMVNo0uoNA&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect!', undefined)
        } else if (body.features.length == 0) {
            callback('unable to find!', undefined)
        } else {
            let data = body.features[0].center
            callback(undefined, {
                lat: data[0],
                lon: data[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
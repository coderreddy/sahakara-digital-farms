const request = require('request')
const chalk = require('chalk')

//Calls the Map Box API to pull the Geo code information for the provided City and State 
const mapBoxApiCall = (city, state, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + ',' + state + '.json?access_token=pk.eyJ1Ijoia2tyZWRkeSIsImEiOiJja2FuNWZldXUxbHZpMzZzMHhvNGk5c3pmIn0.HMHJfgLKaAdALV5iISa-qQ&limit=1';
    request({ url, json: true }, (error, response, body) => {
            if (error) {
                    console.log(chalk.red.inverse('Geo Code API call failed with error: ' + error));
                    callback(error, undefined)
            } else if (body.message || body.features.length === 0) {
                    const errorMessage = 'No details found for provided city:' + city + ' and state:' + state + ' .Try another search'
                    console.log(chalk.red.inverse(errorMessage))
                    callback(errorMessage, undefined)
            } else {
                    callback(undefined, {
                            latitude: body.features[0].center[1],
                            longitude: body.features[0].center[0]
                    });
            }
    })
}

module.exports = mapBoxApiCall

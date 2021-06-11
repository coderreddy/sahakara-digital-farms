const request = require('request')
const chalk = require('chalk')

//Calls the Weather Stack API to pull the weather informtation for the provided latitude and longitude
const weatherApiCall = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9c1cf64baa042b30f1e8619fa6324d1d&query=' + latitude + ',' + longitude;
    request({ url, json: true }, (error, response, body) => {
            if (error) {
                    console.log(chalk.red.inverse('Weather API failed with error: ' + error));
                    callback(error,undefined)
            } else if (body.success == false || body.error) {
                    console.log(chalk.red.inverse('Weather API call failed with error: ' + JSON.stringify(body.error)));
                    callback(body.error,undefined)
            } else {
                    const {temperature, feelslike, humidity} = body.current
                    console.log(chalk.green.inverse(body.current.weather_descriptions[0] + '. Its currently ' + temperature + ' degress out. It Feels like ' + feelslike + ' degress out. The Humidity is ' + humidity + '%'));
                    callback(undefined,body);
            }
    });
}

module.exports = weatherApiCall
const request = require('request');
const chalk = require('chalk');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=11d86437ecea8d7e10fce853631365f3&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to access weather stack', undefined);
        } else if(body.success === false) {
            console.log('Unable to find location');
        } else {
            if(body.current.temperature < 0) {
                console.log(chalk.red.bold('Elbes el jacket y kosomak la testahwa'));
            }
            callback(undefined, `It is currently ${body.current.temperature} degress, feels like ${body.current.feelslike}`);
        }   
    }); 
};

module.exports = forecast;
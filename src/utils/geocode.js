const request = require('request');

const geocode = (address, callback) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYm9iemFwaSIsImEiOiJja2toYzI3cWYxYnVmMnBxdGUwN2p1ZG9tIn0.IZteyE04ZKN1zsDQ97PpMg`

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to access location service', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location');
        } else {
            const data = {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0]
            }

            callback(undefined, data);
        }
    });
};

module.exports = geocode;
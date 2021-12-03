/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');


const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  request(url, (error, response, body) => {
    
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);//new Error object that we can pass around. In this case, 
      // we pass it back to the callback to indicate that something went wrong
      return;
    }
    const ip = JSON.parse(body).ip;//.ip make a string
    callback(null,ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  
  request(`https://api.freegeoip.app/json/${ip}?apikey=31508530-5472-11ec-9ae1-9f20f199f4af`, (error, response, body) => {


    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);//new Error object that we can pass around. In this case, 
      // we pass it back to the callback to indicate that something went wrong
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    return callback(null, { latitude, longitude });
  });
      
  };

 

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP
};
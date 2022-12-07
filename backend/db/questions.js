const fs = require('fs'); 
let rawdata = fs.readFileSync('./tests.json'); 
let jsondata = JSON.parse(rawdata);
module.exports = jsondata;
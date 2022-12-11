const fs = require('fs'); 
let rawdata = fs.readFileSync('./db/tests.json'); 
let jsondata = JSON.parse(rawdata);
module.exports = jsondata;
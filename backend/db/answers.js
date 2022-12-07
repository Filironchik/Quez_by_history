const fs = require('fs'); 
let rawdata = fs.readFileSync('./answers.json'); 
module.exports = JSON.parse(rawdata);
const fs = require('fs'); 
let rawdata = fs.readFileSync('./db/answers.json'); 
module.exports = JSON.parse(rawdata);
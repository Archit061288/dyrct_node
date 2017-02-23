module.exports = require('./env/' + process.env.NODE_ENV + '.js');
console.log(process.env.NODE_ENV)
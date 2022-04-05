const nconf = require('nconf');
const defaults = require('./default.json');

nconf
    .defaults(defaults)
    .env();

module.exports = nconf;

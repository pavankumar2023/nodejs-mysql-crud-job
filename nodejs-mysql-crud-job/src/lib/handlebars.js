const { format } = require('timeago.js');

const helpers = {
    timeago(timestamp){
        return format(timestamp);
    }
};

module.exports = helpers;
var colors = require('colors');

module.exports = {
    processlog: function(message) {
        console.log(message.italic.gray)
    },
    info: function(message) {
        console.log(message)
    },
    error: function(message) {
        console.log(message.red)
    },
    warn: function(message) {
        console.log(message.yellow)
    }
};
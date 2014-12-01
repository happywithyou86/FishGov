var path = require("path");

// accidental inclusion of possible hidden files
module.exports = function(name) {
    return /(\.(js)$)/i.test(path.extname(name));
};
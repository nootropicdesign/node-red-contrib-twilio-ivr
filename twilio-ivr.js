
var initialized = false;

module.exports = function(RED) {
    if (!initialized) {
        initialized = true;
        init();
    }
    return {
    };
};

var settings = {};

function init() {
}


exports = function(fn) {
    return function() {
        console.log(arguments);
        return fn.apply(this, arguments);
    }
}

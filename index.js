exports = {
    interceptFunction: function(fn) {
        return function() {
            console.log(arguments);
            fn(arguments);
        }
    }
}
        

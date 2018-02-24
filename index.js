const fs = require('filesystem')

const interceptado = {}

exports = {
    intercept: function(fn) {
        return function() {
            let retorno = fn.apply(this, arguments);
            interceptado[fn.name]
            if (!interceptado[fn.name]) {
                interceptado[fn.name] = []
            }
            interceptado[fn.name].push({ entrada: arguments, saida: retorno });
            console.log(JSON.stringify(interceptado));
            return retorno;
        }
    },
    save: function() {
        console.log(fs.saveToFile)
        fs.saveToFile('../interceptado.json', JSON.stringify(interceptado, null, 2));
    }
}


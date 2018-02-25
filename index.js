const fs = require('filesystem')

const interceptado = {}

function interceptFunction(fn) {
    return function() {
        let retorno = fn.apply(this, arguments);
        interceptado[fn.name] = interceptado[fn.name] || []
        interceptado[fn.name].push({ entrada: arguments, saida: retorno });
        return retorno;
    }
}

exports = {
    intercept: function(exportObject) {
        const interceptedExport = {}
        Object.keys(exportObject).forEach(function(key) {
            if (typeof exportObject[key] === 'function') {
                interceptedExport[key] = interceptFunction(exportObject[key]) 
            } else {
                interceptedExport[key] = exportObject[key] 
            }
        });
        return interceptedExport;
    },
    save: function() {
        const fileContent = JSON.stringify(interceptado, null, 2)
        fs.saveToFile('interceptado.json', fileContent);
    }
}


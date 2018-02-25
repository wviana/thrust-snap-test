const fs = require('filesystem')


const trueRequire = require;
exports = {
    loadRootModule: function(module, config) {
        function require(fileName) {
            const trueRequireResult = oldRequire(fileName);
            if (config.modules.indexOf(module) >= 0) {
                return SnapTest(fileName).intercept(trueRequireResult)
            }

            return trueRequireResult;
        }

        return require(module);
    },
    new: SnapTest
}

function SnapTest(fileName) {
    const interceptado = {}

    function interceptFunction(fn) {
        return function() {
            let retorno = fn.apply(this, arguments);
            interceptado[fn.name] = interceptado[fn.name] || []
            interceptado[fn.name].push({ entrada: arguments, saida: retorno });
            save()
            return retorno;
        }
    }

    function save() {
        const result = { filePath: fileName, intercepted: interceptado }
        const fileContent = JSON.stringify(result, null, 2)
        fs.saveToFile(fileName + ".st.json", fileContent);
    }

    return {
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
        }
    }
}

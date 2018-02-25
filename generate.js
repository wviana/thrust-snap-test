const fs = require('filesystem')

function generateFileHeader(fileName, filePath) {
    const testedFilePath = filePath.replace('./','./app/')
    return [
        'let majesty = require(\'majesty\')',
        'let provider = require(\'' + testedFilePath + '.js\')\n',
        'function exec (describe, it, beforeEach, afterEach, expect, should, assert) {',
        '\tdescribe(\'Teste ' + fileName + '\', function () {\n'
    ];
}

function generateFileFooter() {
    return [
        '\t})',
        '}\n',
        'let res = majesty.run(exec)\n',
        'print(res.success.length, \' scenarios executed with success and\')',
        'print(res.failure.length, \' scenarios executed with failure.\')\n',
        'res.failure.forEach(function (fail) {',
        '\tprint(\'[\' + fail.scenario + \'] =>\', fail.execption)',
        '})'
    ]
}

function generateMajestyTest(fileName) {
    var content = '';
    console.log('### generate #############################################');
    var jsonFile = fs.readJson(fileName);

    content += generateFileHeader(fileName, jsonFile.filePath).join('\n')
    
        
    Object.keys(jsonFile).forEach(function(c1) {
        if (c1 == "intercepted"){
            // funções
            Object.keys(jsonFile[c1]).forEach(function(c2){
                
                content += '\t\tit(\'Interceptar função ' + c2 + '\', function () {\n';
        
                Object.keys(jsonFile[c1][c2]).forEach(function(c3){
                    
                    var parameters;
                    var output;
           
                    output = jsonFile[c1][c2][c3]["saida"];
                
                    content += '\t\t\texpect(provider.' + c2 + '(';

                    Object.keys(jsonFile[c1][c2][c3]["entrada"]).forEach(function(valor){
                        var type_params = typeof jsonFile[c1][c2][c3]["entrada"][valor];
                        console.log("#################" + type_params);
                        console.log(type_params);
                        if ( type_params == "string" ) {
                            content += '"' + jsonFile[c1][c2][c3]["entrada"][valor] + '",';    
                        } else if (type_params == "object"){
                            content += JSON.stringify(jsonFile[c1][c2][c3]["entrada"][valor]) + ',';
                        } else if (type_params == "number"){
                            content += jsonFile[c1][c2][c3]["entrada"][valor] + ',';
                        } else {
                            content += '0,';
                        } 
                        
                        content = content.substring(0, content.length - 1);
                    });                        
                    
                    if ( typeof output === "string" ) {
                        content += ')).to.equal("' + output + '");\n';    
                    } else if (typeof output === "object") {
                        content += ')).to.equal(' + JSON.stringify(output) + ');\n';
                    } else if (typeof output === "number") {
                        content += ')).to.equal(' + output + ');\n';
                    } else {
                        content += ')).to.equal({});\n';
                    }
                })

                content += '\t\t})\n';
            })

            content += generateFileFooter().join('\n')
            
            //console.log(content);
            console.log('### generate finished ####################################');

            let nome_arq = new java.io.File(fileName).getName();
            console.log(to_testJs);
            var to_testJs = nome_arq.replace('.json','') + '.test.js';
            fs.saveToFile('./' + to_testJs, content);
        }
    })

    
}

function executeTestForFolder(files) {
    files.forEach(function(valor, chave){
        generateMajestyTest(valor);
    });
}

exports = {
    executeTestForFolder: executeTestForFolder
}
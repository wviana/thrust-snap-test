const fs = require('filesystem')
const generate = require('./generate.js')

function listFiles(){
    var folder = new File('./');
    var listOfFiles = folder.listFiles();
    var arquivos = [];

    for (i = 0; i < listOfFiles.length; i++) {
        const currentFile = listOfFiles[i]
        if (currentFile.isFile()) {
            var currentFileName = currentFile.getName();
            if(currentFileName.indexOf(".st.json") != -1){
                 arquivos.push(currentFile.getName());
            }
        }
    }
    return  arquivos;
}

exports = {
    listFiles: listFiles
}

const files = listFiles();
generate.executeTestForFolder(files);
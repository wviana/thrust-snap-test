const fs = require('filesystem')
const generate = require('./generate.js')

function listFiles(){
    var folder = new File('./');
    var listOfFiles = folder.listFiles();
    var arquivos = [];

    for (i = 0; i < listOfFiles.length; i++) {
        const currentFile = listOfFiles[i]
        if (currentFile.isFile()) {
            if(currentFile.getName().indexOf(".st.json") != -1){
                arquivos.push(currentFile.getName());
            }
        }
    }
    return  arquivos;
}


exports = {
    listFiles: listFiles
}

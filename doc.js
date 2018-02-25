const fs = require('filesystem')

function documentarMetodo(chave) {

}

function getTipoEntradas(chamadas) {
    const tipoParametros = {}
    chamadas.forEach(function(chamada) {
        const entrada = chamada.entrada;
        Object.keys(entrada).forEach(function (parametro) {
            tipoParametros[parametro] = tipoParametros[parametro] || [];
            const tipo = typeof entrada[parametro];
            if (tipoParametros[parametro].indexOf(tipo) < 0 ) {
                tipoParametros[parametro].push(tipo);
            }
        })      
    });

    let stringsParametros = []
    Object.keys(tipoParametros).forEach(function (parametro) {
        stringsParametros.push(tipoParametros[parametro].join("|"));
    });
        
    return stringsParametros.join(",");
}

function getTipoRetorno(chamadas) {
    const tiposResposta = []
    chamadas.forEach(function (chamada) {
        const tipoSaida = typeof chamada.saida
        if (tiposResposta.indexOf(tipoSaida) < 0 ) {
            tiposResposta.push(tipoSaida)
        }
        
    })

    return tiposResposta.join("|")
}


function read() {
    let json = fs.readJson("interceptado.json")
    let linhasHtml = []
    Object.keys(json).forEach(function(metodo) {
        const chamadas = json[metodo]
        const tiposEntradas = getTipoEntradas(chamadas);
        const tiposRetorno = getTipoRetorno(chamadas);
        const assinatura = metodo + "(" + tiposEntradas + ")";
        linhasHtml.push(linhaHtmlFuncao(tiposRetorno, assinatura))
    });
    show(imprimirHtml(linhasHtml))
}

function linhaHtmlFuncao(retorno, assinatura) {
    return "<tr>" + 
                "<td>"+retorno+"</td>" +
                "<td>"+assinatura+"</td>" +
            "</tr>";
}

function imprimirHtml (linhas) {
  return '<link rel="stylesheet" type="text/css" href="tabela.css">' +  
        "<table>"+
            "<tr>" +
                "<th>Retorno</th>" +
                "<th>Assinatura</th>"+
            "</tr>" +
                linhas.join("\n") +
        "</table>";
}

read()


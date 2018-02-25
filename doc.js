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

function getAssinaturas(nomeMetodo, chamadas) {
    const assinaturaReposta = {}

    chamadas.forEach(function (chamada) {
        const tiposEntradas = []
        Object.keys(chamada.entrada).forEach(function(chaveEntrada) {
            const tipo = typeof chamada.entrada[chaveEntrada]
            tiposEntradas.push(tipo);
        });
        const assinatura = nomeMetodo + "(" + tiposEntradas.join(", ") + ")";
        const tipoSaida = typeof chamada.saida
        if (assinaturaReposta[assinatura]) {
            assinaturaReposta[assinatura] = assinaturaReposta[assinatura] + " | " + tipoSaida;
        } else {
            assinaturaReposta[assinatura] = tipoSaida
        }
    })

    return assinaturaReposta;
}

function read() {
    let json = fs.readJson("test/snaptest.st.json").intercepted;
    let linhasHtml = []
    Object.keys(json).forEach(function(metodo) {
        const chamadas = json[metodo]
        
        const assinaturaResposta = getAssinaturas(metodo, chamadas);

        Object.keys(assinaturaResposta).forEach(function (assinatura) {
            const retorno = assinaturaResposta[assinatura]
            linhasHtml.push(linhaHtmlFuncao(retorno, assinatura))
        });
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


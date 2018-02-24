let majesty = require('majesty')
let interceptor = require('../index')

function maisUm(numero) {
    return numero + 1;
}

function exec (describe, it, beforeEach, afterEach, expect, should, assert) {
  afterEach(function () {
    // Função a ser executada antes de cada teste
  })

  beforeEach(function () {
    // Função a ser executada após cada teste
  })

  describe('Teste Interceptor', function () {
    it('Interceptar funcao mais1', function () {
      let interceptado = interceptor(maisUm);
      expect(interceptado(23)).to.equal(maisUm(23))
    })
  })
}

let res = majesty.run(exec)

print(res.success.length, ' scenarios executed with success and')
print(res.failure.length, ' scenarios executed with failure.\n')

res.failure.forEach(function (fail) {
  print('[' + fail.scenario + '] =>', fail.execption)
})

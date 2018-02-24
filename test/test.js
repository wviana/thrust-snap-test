let majesty = require('majesty')
let SnapTest = require('../index')

function maisUm(numero) {
    return numero + 1;
}

function somaAB(a, b) {
    return a + b;
}

function exec (describe, it, beforeEach, afterEach, expect, should, assert) {
  afterEach(function () {
    SnapTest.save();
  })

  beforeEach(function () {
    // Função a ser executada após cada teste
  })

  describe('Teste Interceptor', function () {
    it('Interceptar funcao mais1', function () {
      let interceptado = SnapTest.intercept(maisUm);
      expect(interceptado(23)).to.equal(maisUm(23))
    })

    it('Interceptar funcao somaAB', function () {
      let interceptado = SnapTest.intercept(somaAB);
      expect(interceptado(1, 2)).to.equal(somaAB(1, 2))
    })

    it('Interceptar funcao mais1 novamente', function () {
      let interceptado = SnapTest.intercept(maisUm);
      expect(interceptado(13)).to.equal(maisUm(13))
    })
  })
}

let res = majesty.run(exec)

print(res.success.length, ' scenarios executed with success and')
print(res.failure.length, ' scenarios executed with failure.\n')

res.failure.forEach(function (fail) {
  print('[' + fail.scenario + '] =>', fail.execption)
})

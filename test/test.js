let majesty = require('majesty')
let SnapTest = require('../index')

function maisUm(numero) {
    return numero + 1;
}

function somaAB(a, b) {
    return a + b;
}

let exportObject = {
    maisUm: maisUm,
    somaAB: somaAB
}

let exportIntercepted;
function beforeAll() {
   exportIntercepted = SnapTest.intercept(exportObject); 
}

function afterAll() {
    SnapTest.save();
}

function exec (describe, it, beforeEach, afterEach, expect, should, assert) {
  afterEach(function () {
  })

  beforeEach(function () {
  })

  describe('Teste Interceptor', function () {
    it('Interceptar funcao mais1', function () {
      expect(exportIntercepted.maisUm(23)).to.equal(exportObject.maisUm(23))
    })

    it('Interceptar funcao somaAB', function () {
      expect(exportIntercepted.somaAB(1, 2)).to.equal(exportObject.somaAB(1, 2))
    })

    it('Interceptar funcao mais1 novamente', function () {
      expect(exportIntercepted.maisUm(13)).to.equal(exportObject.maisUm(13))
    })
  })
}

beforeAll()
let res = majesty.run(exec)
afterAll()

print(res.success.length, ' scenarios executed with success and')
print(res.failure.length, ' scenarios executed with failure.\n')

res.failure.forEach(function (fail) {
  print('[' + fail.scenario + '] =>', fail.execption)
})

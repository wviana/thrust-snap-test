let majesty = require('majesty')
let SnapTest = require('../index')

// let qualquer;

// const oldRequire = require;
// function loadRequire() {
//     function require(fileName) {
//         const trueRequireResult = oldRequire(fileName);
//         console.log('Nome do arquivo:' + fileName)
//         return SnapTest.intercept(trueRequireResult)
//     }

//     qualquer = require('../qualquer');
// }

// loadRequire()
// console.log(qualquer.ola('Wesley'))

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
    exportIntercepted = SnapTest.new('./snaptest').intercept(exportObject); 
}

function afterAll() {
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

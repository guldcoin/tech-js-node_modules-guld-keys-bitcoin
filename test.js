/* global describe:false it:false before:false */
const assert = require('chai').assert
const btc = require('./index.js')
const seed = 'bFaCeeF2Ea7ab1d6d3dfaDda3e050acDEA46357FC591452Dca17D9B54D5EceBaC5CAC78C170eFB0A5Fbd1c63edCF610ea53D'
const wif = 'KzWk8hz2ypwd4rsdiwHNEvjWWFY8rRHpC7Y2tBhpoR83WLh72ce2'
const pubkey = '15CZvdRCWhntKstELmUb896TSd1Wk4wtT7'
const otherpubkey = '1FkKMsKNJqWSDvTvETqcCeHcUQQ64kSC6s'

describe('btc', function () {
  it('generate', async function () {
    this.randkey = await btc.generate()
    assert.exists(this.randkey)
    assert.exists(this.randkey.publicAddress)
    assert.exists(this.randkey.privateWif)
    assert.notEqual((await btc.listKeys()).indexOf(this.randkey.publicAddress), -1)
  })
  it('generate w seed', async function () {
    this.key = await btc.generate({seed: seed})
    assert.exists(this.key)
  })
  it('exportPrivateKey', async function () {
    this.wif = await btc.exportPrivateKey(this.key.publicAddress)
    assert.equal(this.wif, wif)
  })
  it('listKeys', async function () {
    var keylist = await btc.listKeys()
    assert(keylist.length === 2)
  })
  it('importPrivateKey', async function () {
    var addr = await btc.importPrivateKey(wif)
    assert.equal(addr, pubkey)
    var gotkey = await btc.getPrivateKey(addr)
    assert.equal(this.key.publicAddress, gotkey.publicAddress)
    var keylist = await btc.listKeys()
    assert(keylist.length === 2)
  })
})

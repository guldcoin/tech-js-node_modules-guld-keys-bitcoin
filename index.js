const CoinKey = require('coinkey')
const { encrypt, decrypt, getPublicKey } = require('keyring-interface')
const pgp = require('keyring-gpg') || require('keyring-pgp')
const pubkeys = []
const privkeys = {}

async function generate (options) {
  if (options && options.seed) key = CoinKey(new Buffer(options.seed.slice(0, 32)))
  else key = CoinKey.createRandom()
  importPrivateKey(key.privateWif)
  importPublicKey(key.publicAddress)
  return key
}

async function clear () {

}

async function store () {

}

async function listKeys () {
  return pubkeys
}

async function importPublicKey (addr) {
  pubkeys.push(addr)
}

async function importPrivateKey (wif) {
  key = CoinKey.fromWif(wif)
  privkeys[key.publicAddress] = key
  return key.publicAddress
}

async function getPrivateKey (addr) {
  return privkeys[addr]
}

async function exportPrivateKey (addr) {
  return privkeys[addr].privateWif
}

async function isLocked (addr) {
  return !privkeys.hasOwnProperty(addr)
}

async function unlockKey (addr) {

}

async function lockKey (addr) {
  delete privkeys[addr]
}

async function sign () {

}

async function verify () {

}

module.exports = {
  generate: generate,
  clear: clear,
  store: store,
  listKeys: listKeys,
  importPublicKey: importPublicKey,
  importPrivateKey: importPrivateKey,
  getPublicKey: getPublicKey,
  getPrivateKey: getPrivateKey,
  isLocked: isLocked,
  unlockKey: unlockKey,
  lockKey: lockKey,
  sign: sign,
  verify: verify,
  decrypt: decrypt,
  encrypt: encrypt,
  exportPrivateKey: exportPrivateKey
}

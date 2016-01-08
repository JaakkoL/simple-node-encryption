'use strict'

var crypto = require('crypto')

function Encryption(algorithm, iv) {
  iv = iv || new Buffer('')

  function encrypt(message, key) {
    var buffer = (message instanceof Buffer) ? message : new Buffer(message, 'utf8')
    var cipher = crypto.createCipheriv(algorithm, key, iv)
    var crypted = Buffer.concat([cipher.update(buffer), cipher.final()])

    return crypted
  }

  function decrypt(buffer, key) {
    var decipher = crypto.createDecipheriv(algorithm, key, iv)
    var decrypted = Buffer.concat([decipher.update(buffer), decipher.final()])

    return decrypted
  }

  return {
    encrypt: encrypt,
    decrypt: decrypt
  }
}

module.exports = Encryption

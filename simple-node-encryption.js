'use strict'

var crypto = require('crypto')
var algorithm = 'aes-256-ecb'
var iv = new Buffer('') // Buffer is really not needed with ECB.

var exports = module.exports = {}

exports.encrypt = function(message, key) {
  var buffer = (message instanceof Buffer) ? message : new Buffer(message, 'utf8')
  var cipher = crypto.createCipheriv(algorithm, key, iv)
  var crypted = Buffer.concat([cipher.update(buffer), cipher.final()])

  return crypted
}

exports.decrypt = function (buffer, key) {
  var decipher = crypto.createDecipheriv(algorithm, key, iv)
  var decrypted = Buffer.concat([decipher.update(buffer), decipher.final()])

  return decrypted
}

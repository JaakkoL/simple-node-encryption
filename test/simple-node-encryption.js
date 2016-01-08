'use strict'

var chai = require('chai')
var should = chai.should()
var encryption = require('../simple-node-encryption')

var secretString = 'This is a very secret message.'

// openssl list-cipher-algorithms
var algorithms = [
  { name: 'aes-128-ecb', iv: getBuffer(), key: getKey(16) },
  { name: 'aes-128-cbc', iv: getBuffer(16), key: getKey(16) },
  { name: 'aes-192-ecb', iv: getBuffer(), key: getKey(24) },
  { name: 'aes-192-cbc', iv: getBuffer(16), key: getKey(24) },
  { name: 'aes-256-ecb', iv: getBuffer(), key: getKey(32) },
  { name: 'aes-256-cbc', iv: getBuffer(16), key: getKey(32) }
]

describe('Simple data encryption', function() {

  algorithms.forEach(function(algorithm) {
    var encryptionService = encryption(algorithm.name, algorithm.iv)

    describe('Testing ' + algorithm.name, function() {
      it('Should encrypt and decrypt correctly Strings', function() {
        testStringEncryption(encryptionService, algorithm.key)
      })

      it('Should encrypt and decrypt correctly Buffers', function() {
        testBufferEncryption(encryptionService, algorithm.key)
      })
    })

  })
})

function getKey(length) {
  return 'abcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzy'.slice(0, length)
}

function getBuffer(size) {
  return (size) ? new Buffer(size).fill(0) : new Buffer('')
}

function testStringEncryption(encryptionService, encryptionKey) {
  var encrypted = encryptionService.encrypt(secretString, encryptionKey)
  var decrypted = encryptionService.decrypt(encrypted, encryptionKey).toString('utf8')

  decrypted.should.equal(secretString)
}

function testBufferEncryption(encryptionService, encryptionKey) {
  var buffer = new Buffer(secretString, 'utf8')
  var encrypted = encryptionService.encrypt(buffer, encryptionKey)
  var decrypted = encryptionService.decrypt(encrypted, encryptionKey).toString('utf8')

  decrypted.should.equal(secretString)
}

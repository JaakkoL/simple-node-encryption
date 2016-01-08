'use strict'

var chai = require('chai')
var should = chai.should()
var encryption = require('../simple-node-encryption')

var encryptionKey = '12345678901234567890123456789012' // For AES-256
var secretString = 'This is a very secret message.'

describe('Simple data encryption', function() {
  it('Should encrypt correctly Strings', function() {
    var encrypted = encryption.encrypt(secretString, encryptionKey)
    var decrypted = encryption.decrypt(encrypted, encryptionKey).toString('utf8')

    decrypted.should.equal(secretString)
  })

  it('Should encrypt correctly Buffers', function() {
    var buffer = new Buffer(secretString, 'utf8')
    var encrypted = encryption.encrypt(buffer, encryptionKey)
    var decrypted = encryption.decrypt(encrypted, encryptionKey).toString('utf8')

    decrypted.should.equal(secretString)
  })
})

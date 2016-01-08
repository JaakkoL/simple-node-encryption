# simple-node-encryption

This module uses nodes core [crypto](https://nodejs.org/api/crypto.html) module into a simple encryption service.

## Usage

Example usage:

```javascript
var encryption = require('simple-node-encryption')
var algorithm = 'aes-256-cbc'
var iv = new Buffer(16).fill(0) // Make this random in real life.
var encryptionKey = '12345678901234567890123456789012'

var encryptionService = encryption(algorithm, iv)

var encrypted = encryptionService.encrypt('stringOrBufferToEncrypt', encryptionKey)
var decrypted = encryptionService.decrypt(encrypted, encryptionKey).toString('utf8')

```

## Testing

Run `npm test` to run tests. Currently tested and supported encryption algorithms are:

```
aes-128-cbc
aes-128-ecb
aes-192-cbc
aes-192-ecb
aes-256-cbc    
aes-256-ecb
```

Run `openssl list-cipher-algorithms` to list all possible cipher algorithms.

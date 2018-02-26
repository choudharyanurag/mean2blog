const crypto = require('crypto');
const buf = crypto.randomBytes(256);
console.log(
  `${buf.length} bytes of random data: ${buf.toString('hex')}`);
const cryptoBuffer = buf.toString('hex');

module.exports = {
    db:'temoli',
    uri:'mongodb://localhost:27017/temoli',
    secret: cryptoBuffer
}
const crypto = require('crypto');
const buf = crypto.randomBytes(256);
console.log(
  `${buf.length} bytes of random data: ${buf.toString('hex')}`);
const cryptoBuffer = buf.toString('hex');

module.exports = {
    db:'blog-site-db',
    uri:'mongodb://localhost:27017/' + this.db,
    secret: cryptoBuffer
}
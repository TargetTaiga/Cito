const crypto = require('crypto');

const hash = crypto.createHash('sha256').update('some data to hash').digest('hex');
console.log(hash);
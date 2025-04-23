const webpush = require('web-push');

// Generate VAPID keys
const { publicKey, privateKey } = webpush.generateVAPIDKeys();

console.log('Public Key:', publicKey);
console.log('Private Key:', privateKey);

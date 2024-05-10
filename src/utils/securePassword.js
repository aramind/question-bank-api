const cryptoJS = require("crypto-js");
const dotenv = require("dotenv");
dotenv.config();
const KEY = JSON.parse(process.env.MAGIC_WORD);

const securePassword = {
  encrypt: (pw) => {
    return cryptoJS.AES.encrypt(pw, KEY).toString();
  },
  decrypt: (pw) => {
    const decryptedBytes = cryptoJS.AES.decrypt(pw, KEY);
    return decryptedBytes.toString(cryptoJS.enc.Utf8);
  },
};

module.exports = securePassword;

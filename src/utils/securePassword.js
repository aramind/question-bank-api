const cryptoJS = require("crypto-js");
const { KEY } = require("../config/constants");

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

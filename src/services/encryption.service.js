const argon = require("argon2");
const bcrypt = require("bcrypt");

// class EncryptionService {
//   async encrypt(password) {
//     const encrypted = await argon.hash(password);
//     return encrypted;
//   }
//   decrypt() {}
//   async compare(plainPassword, hashedPassword) {
//     const verified = await argon.verify(hashedPassword, plainPassword);
//     return verified;
//   }
// }

async function encrypt(password) {
  const salt = bcrypt.genSaltSync(12);
  const encrypted = await bcrypt.hash(password, salt);
  return encrypted;
}

async function comparePassword(plainPassword, encryptedPassword) {
  const verified = await bcrypt.compare(plainPassword, encryptedPassword);
  return verified;
}

module.exports = { encrypt, comparePassword };

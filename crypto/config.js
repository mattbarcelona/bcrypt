// Configuraremos Crypto y Bcrypt para hacer más segura nuestra app
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const secret = crypto.randomBytes(64).toString("hex");
const hashedSecret = bcrypt.hashSync(secret, 10);

module.exports = hashedSecret;

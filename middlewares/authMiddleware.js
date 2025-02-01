const jwt = require("jsonwebtoken");
const hashedSecret = require("../crypto/config");

const generarToken = (user) => {
  const token = jwt.sign({ user: user.id }, hashedSecret, { expiresIn: "1h" });
  return token;
};

const verificarToken = (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ mensaje: "token no generado" });
  }
  jwt.verify(token, hashedSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ mensaje: "Token no valido" });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = { generarToken, verificarToken };

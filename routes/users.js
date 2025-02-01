// Aquí estarán todas las rutas

const express = require("express");
const router = express.Router();
const users = require("../data/users");
const {
  generarToken,
  verificarToken,
} = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  const formLogin = `
    <form action="/login"method="post">
    <label for="username">Usuario:</label>
    <input type="text" id="username" name="username" required><br>
    
    <label for="password">Contraseña:</label>
    <input type="password" id="password" name="password" required><br>
    
    <button type="submit">Iniciar sesión</button>
    </form>
    <a href="/dashboard">dashboard</a>
    `;

  res.send(formLogin);
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = generarToken(user);
    req.session.token = token;
    res.redirect("/dashboard");
  } else {
    res.status(401).json({ mensaje: "usuario no encontrado" });
  }
});

router.get("/dashboard", verificarToken, (req, res) => {
  const userId = req.user;
  const user = users.find((user) => user.id === userId);

  if (user) {
    const dashboardTemplate = `
    <h1>Bienvenido, ${user.name}</h1>0
    <p>ID: ${user.id}</p>
    <p>UserName: ${user.username}</p>
    <a href="/">Home</a>
    <form action="/logout"method="post">
    <button type="submit"> Cerrar sesión</button>
    </form>
    `;
    res.send(dashboardTemplate);
  } else {
    res.status(401).json({ mensaje: "token no valido" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;

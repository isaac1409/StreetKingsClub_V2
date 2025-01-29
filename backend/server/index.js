const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./routes/db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express(); 

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta para ver que BD esta chida
app.get('/api/healthcheck', (req, res) => {
  pool.query('SELECT 1', (error, results) => {
    if (error) {
      console.error('Error al conectar con la base de datos:', error);
      return res.status(500).json({ error: 'Error al conectar con la base de datos' });
    }
    res.status(200).json({ message: 'Conexión exitosa con la base de datos :)' });
  });
});

// Ruta básica
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

// Aquí vamos a poner las rutas API
// Ruta para iniciar sesión
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña requeridos" });
  }
  pool.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Error en el servidor" });
    if (results.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    const usuario = results[0];
    //Comparar con hash
    //const isMatch = await bcrypt.compare(password, usuario.password);
    const isMatch = (password == usuario.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, usuario: { id: usuario.id, email: usuario.email, nombre: usuario.username } });
  });
});


//Middleware para proteger rutas backend
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ message: "Acceso denegado" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

// Middleware para manejar rutas no encontradas, muestra un 404
app.use((req, res, next) => {
  res.status(404).json({
    message: '¡Ups! Estás perdido. Consulta la documentación de la API para encontrar una ruta correcta'
  });
});

module.exports = app;

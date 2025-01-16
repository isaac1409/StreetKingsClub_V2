const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./routes/db');

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

// Middleware para manejar rutas no encontradas, muestra un 404
app.use((req, res, next) => {
  res.status(404).json({
    message: '¡Ups! Estás perdido. Consulta la documentación de la API para encontrar una ruta correcta'
  });
});

module.exports = app;

const axios = require('axios');
const path = require('path');
const express = require('express');
const { generarPregunta } = require('./preguntas');
const { cargarUsers, guardarUser } = require('./users');
const app = express();
const PORT = process.env.PORT || 3000;

//generar y devolver una pregunta aleatoria
app.get('/api/pregunta', async (req, res) => {
  try {
      const respuesta = await axios.get('https://restcountries.com/v3.1/all');
      const paises = respuesta.data;
      const pregunta = await generarPregunta(paises);
      res.json(pregunta);
  } catch (error) {
      console.error('Error al cargar los países:', error);
      res.status(500).json({ error: 'No se pudieron obtener los paises' });
  }
});

//Middleware para usar el archivo users.json
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});



// Guardar resultado del player
app.post('/api/guardarResultado', (req, res) => {
    const resultado = req.body;
    guardarUser(resultado);
    res.sendStatus(200);
});

// Obtener ranking TOP 20
app.get('/api/ranking', (req, res) => {
    const resultados = cargarUsers();
    const top20 = resultados.sort((a, b) => b.puntaje - a.puntaje).slice(0, 20);
    res.json(top20);
});




app.listen(PORT, () => {
  console.log('Servidor funcionando en el puerto', PORT);
});
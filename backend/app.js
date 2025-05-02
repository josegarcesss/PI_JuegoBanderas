const axios = require('axios');
const express = require('express');
const { generarPregunta } = require('./preguntas');

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
  }
});


/* 
let paisAleatorio = {};

// Función para obtener información necesaria de un país seleccionado aleatoriamente
async function getCountryRamdom() {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const paises = response.data;

    if (!paises || paises.length === 0) {
      console.error('No se encontraron países en la API.');
      return null;
    }
    const indiceRandom = Math.floor(Math.random() * paises.length);
    const contryRandom = paises[indiceRandom];
    return contryRandom;

  } catch (error) {
    console.error('Ocurrió un error:', error.message);
    return null;
  }
}

// ENPONT para obtener la informacion necesaria del país aleatorio
app.get('/pais-aleatorio', async (req, res) => {
  const dataCountry = await getCountryRamdom();
  if (dataCountry) {
    const paisAleatorio = {
      name: dataCountry.name.common,
      capital: dataCountry.capital[0],
      flag: dataCountry.flags.png,
      cantidadPaiseslimitrofes: dataCountry.borders ? dataCountry.borders.length : 0,
    };
    res.json(paisAleatorio);
  } else {
    res.status(500).json({ error: 'No se pudo obtener información del país.' });
  }
});

*/


app.listen (PORT, () => {
  console.log('Servidor funcionando en el puerto', PORT);
});
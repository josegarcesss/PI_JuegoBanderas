// solicitud de un pais aleatorio
/*
fetch('https://serverpi-xamu.onrender.com/pais-aleatorio')
  .then(response => response.json())
  .then(data => {
    console.log('País aleatorio:', data);

  })
  .catch(error => console.error('Error al obtener el país:', error));

*/

  // solicitar un pais aleatorio
  const axios = require('axios');

async function probandoGetPregunta() { 
    try {
        const res = await axios.get('https://serverpi-xamu.onrender.com/api/pregunta');
        console.log('JSON de la Consigna y su respuesta', res.data);
    } catch (error) {
        console.error('Error al realizar la pregunta:', error.message);
    }
}

probandoGetPregunta();
const axios = require('axios');

  // solicitar un pais aleatorio

async function probandoGetPregunta() { 
    try {
        const res = await axios.get('https://serverpi-6whh.onrender.com/api/pregunta');
        console.log('JSON de la Consigna y su respuesta', res.data);
    } catch (error) {
        console.error('Error al realizar la pregunta:', error.message);
    };
};

probandoGetPregunta();

//-----------------------------------------------------
// guardar el resultado de la partida
async function probandoPostResultado() { 
    const resultado = {
        nombre: "PruebaUsuario",
        puntaje: 40,
        correctas: 8,
        incorrectas: 2,
        tiempoTotal: 90.5,
        promedio: 9.0
    };
    try {
        const res = await fetch("https://serverpi-6whh.onrender.com/api/guardarResultado", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resultado)
        });
        console.log('Resultado guardado:', res.data);
    } catch (error) {
        console.error('Error al guardar el resultado:', error.message);
    };
};

probandoPostResultado();


//-----------------------------------------------------
// solicitar el ranking de los 20 mejores jugadores
async function probandoGetRanking() { 
    try {
        const res = await fetch("https://serverpi-6whh.onrender.com/api/ranking");
        const data = await res.json();
        console.log("RANKING TOP 20:", data);
    } catch (error) {
        console.error('Error al cargar el ranking:', error.message);
    };
};

probandoGetRanking();
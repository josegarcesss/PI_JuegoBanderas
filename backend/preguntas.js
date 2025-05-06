function getItemRandom(arr1) {
    return arr1[Math.floor(Math.random() * arr1.length)];
}

async function generarPregunta(paises) {
    const tipos = ["capital", "flag", "borders"];
    const tipo = getItemRandom(tipos);

    let pregunta = {};
    const pais = getItemRandom(paises);
    const name = pais.name.common;
    const flag = pais.flags.svg || pais.flags.png;
    let opcionesMezcladas;

    if (tipo === "capital") {
        const capital = pais.capital[0];
        const opciones = [name];
        while (opciones.length < 4) {
            const otroPais = getItemRandom(paises);
            if (!opciones.includes(otroPais.name.common)) {
                opciones.push(otroPais.name.common);
            }
        }
        opcionesMezcladas = mezclarArray(opciones);
        pregunta = {
            tipo: "capital",
            texto: `¿Cual es el pais de la siguiente ciudad capital? ${capital}`,
            opciones: opcionesMezcladas,
            respuesta: name,
            puntos: 3,
        };
    }

    if (tipo === "flag") {
        const opciones = [name];
        while (opciones.length < 4) {
            const otroPais = getItemRandom(paises);
            if (!opciones.includes(otroPais.name.common)) {
                opciones.push(otroPais.name.common);
            }
        }
        opcionesMezcladas = mezclarArray(opciones);
        pregunta = {
            tipo: "flag",
            texto: `¿Qué pais está representado por esta Bandera?`,
            flag: flag,
            opciones: opcionesMezcladas,
            respuesta: name,
            puntos: 5,
        };
    }

    if (tipo === "borders") {
        const borders = pais.borders ? pais.borders.length : 0;
        const opciones = [borders];
        while (opciones.length < 4) {
            const Random = Math.floor(Math.random() * 10);
            if (!opciones.includes(Random)) {
                opciones.push(Random);
            }
        }
        opcionesMezcladas = mezclarArray(opciones);
        pregunta = {
            tipo: "borders",
            texto: `¿Cuántos paises limítrofes tiene ${name}?`,
            opciones: opcionesMezcladas,
            respuesta: borders,
            puntos: 3,
        };
    }

    return pregunta;
}

function mezclarArray(arr1) {
    return arr1.sort(() => Math.random() - 0.5);
}

module.exports = { generarPregunta };
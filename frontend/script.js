const playerForm = document.getElementById("playerForm");
const playerNameInput = document.getElementById("playerName");
const nameError = document.getElementById("nameError");
const rankingBtn = document.getElementById("rankingBtn");
const reiniciarBtn = document.getElementById("reiniciarBtn");
const game = document.getElementById("game");
const gameContainer = document.getElementById("game-container");
const resultContainer = document.getElementById("result-container");
const endGame = document.getElementById("endGame");
const rankingList = document.getElementById("rankingList");
const rankinn = document.getElementById("ranking");
let preguntaActual = null;
let numeroPregunta = 0;
const totalPreguntas = 10;
rankingBtn.addEventListener("click", mostrarRanking);
reiniciarBtn.addEventListener("click", reiniciarJuego);

// objeto para almacenar el resultado del usuario
let resultadoUsuario = {
    nombre: "X",
    puntaje: 0,
    correctas: 0,
    incorrectas: 0,
    tiempoTotal: 0,
    promedio: 0,
    inicioTiempo: null,
};

// Validación del nombre del Jugador
playerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = playerNameInput.value.trim();

    if (
        playerName === "" ||
        playerName.length > 30 ||
        !/^[a-zA-Z ]+$/.test(playerName)
    ) {
        nameError.textContent =
            "Ingrese un nombre válido (sin números) (máximo 30 caracteres)";
        nameError.style.display = "block";
        return;
    } else {
        nameError.style.display = "none";
        resultadoUsuario.nombre = playerName;
        resultadoUsuario.inicioTiempo = new Date();

        playerForm.classList.add("hidden");
        game.classList.remove("hidden");

        numeroPregunta = 0;
        siguientePregunta();
    }
});

// Reiniciar el juego
function reiniciarJuego() {
    resultadoUsuario = {
        nombre: "X",
        puntaje: 0,
        correctas: 0,
        incorrectas: 0,
        tiempoTotal: 0,
        promedio: 0,
        inicioTiempo: null,
    };
    document.getElementById("ranking").classList.add("hidden");
    endGame.classList.add("hidden");
    game.classList.add("hidden");
    playerForm.classList.remove("hidden");
}

// Obtener nueva pregunta y mostrarla
async function siguientePregunta() {
    if (numeroPregunta >= totalPreguntas) {
        terminarJuego();
        return;
    }

    try {
        const respuesta = await fetch("/api/pregunta");
        preguntaActual = await respuesta.json();
        numeroPregunta++;

        gameContainer.innerHTML = `
            <h3>Pregunta #${numeroPregunta}</h3>
            <p>${preguntaActual.texto}</p>
            ${preguntaActual.flag ? `<img src="${preguntaActual.flag}" width="100" />` : ""}
            <div class="options">
                ${preguntaActual.opciones
                    .map(
                        (opcion) => `
                    <button onclick="verificar('${opcion}')">${opcion}</button>
                `,
                    )
                    .join("")}
            </div>
        `;
    } catch (error) {
        console.error("Error al obtener pregunta:", error);
        gameContainer.innerHTML =
            "<p>Error al cargar la pregunta. Inténtalo de nuevo.</p>";
    }
}

// Verificar respuesta y actualizar puntaje
function verificar(seleccionada) {
    const acierto = seleccionada === preguntaActual.respuesta;
    if (acierto) {
        resultadoUsuario.correctas++;
        resultadoUsuario.puntaje += preguntaActual.puntos;
    } else {
        resultadoUsuario.incorrectas++;
    }

    const optionsButtons = document.querySelectorAll(".options button");
    optionsButtons.forEach((btn) => (btn.disabled = true));

    gameContainer.innerHTML += `
        <p style="color: ${acierto ? "green" : "red"}">
            ${acierto ? "¡Correcto!" : `Incorrecto. La respuesta era: ${preguntaActual.respuesta}`}
        </p>
        <button onclick="siguientePregunta()">Siguiente</button>
    `;
}

// Termina el juego y envía los datos al backend
function terminarJuego() {
    const finTiempo = new Date();
    resultadoUsuario.tiempoTotal = (
        (finTiempo - resultadoUsuario.inicioTiempo) /
        1000
    ).toFixed(2);
    resultadoUsuario.promedio = (resultadoUsuario.tiempoTotal / 10).toFixed(2);
    delete resultadoUsuario.inicioTiempo;
    fetch("/api/guardarResultado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultadoUsuario),
    });
    game.classList.add("hidden");
    endGame.classList.remove("hidden");
    resultContainer.innerHTML = `
        <p>Nombre: ${resultadoUsuario.nombre}</p>
        <p>Correctas: ${resultadoUsuario.correctas}</p>
        <p>Incorrectas: ${resultadoUsuario.incorrectas}</p>
        <p>Tiempo total: ${resultadoUsuario.tiempoTotal} segundos</p>
        <p>Promedio por pregunta: ${resultadoUsuario.promedio} segundos</p>
        <p>Puntaje total: ${resultadoUsuario.puntaje}</p>
    `;
}

// Mostrar ranking de los mejores 20 jugadores
async function mostrarRanking() {
    if (!rankinn.classList.contains("hidden")) {
        rankinn.classList.add("hidden");
    } else {
        try {
            const respuesta = await fetch("/api/ranking");
            const ranking = await respuesta.json();

            rankinn.classList.remove("hidden");

            rankingList.innerHTML = "";

            if (ranking.length === 0) {
                rankingList.innerHTML =
                    "<p>No hay jugadores registrados aún.</p>";
            } else {
                ranking.forEach((entrada, i) => {
                    rankingList.innerHTML += `
                    <p>#${i + 1} - 
                        Nombre: ${entrada.nombre || "X"} | 
                        Puntaje: ${entrada.puntaje} | 
                        Tiempo: ${entrada.tiempoTotal}s
                    </p>`;
                });
            }
        } catch (error) {
            console.error("Error al cargar el ranking:", error);
            rankingList.innerHTML = "<p>Error al cargar el ranking.</p>";
        }
    }
}
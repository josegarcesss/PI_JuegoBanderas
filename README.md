# 🌍 Juego de Preguntas sobre Países

Este es mi proyecto integrador de Programación Web II.

Un juego donde debes responder preguntas sobre países para ganar puntos y ser el mejor en el ranking! 😎.

---

## 🎥 Video Explicativo del Juego

Video subido a la plataforma de 🤩Youtube ➡️➡️ [VER VIDEO](https://youtu.be/cloO2gFf1bI) ⬅️⬅️

---

## 🕹️ ¿Cómo jugar?

1. Ingresa tu nombre al inicio.
2. Responde 10 preguntas aleatorias:
   - Adivina el país por su capital
   - Adivina el país por su bandera
   - Adivina cuántos países limita un país
3. Al finalizar, verás tu puntaje, tiempo total y promedio por pregunta.
4. ¡Consulta el ranking y compite por ser el mejor en el ranking!

---

>[!IMPORTANT]
>## ⬇️⬇️ Juega online ⬇️⬇️
>➡️➡️ [JUGAR AHORA](https://serverrender-rmqk.onrender.com) ⬅️⬅️

>[!WARNING]
>Por limitaciones del servidor el ranking se almacenará solo temporalmente!

>[!NOTE]
>Ten paciencia 👍, el servidor es un poco lento.

---

## 🧩 Tecnologías utilizadas

- Node.js + Express → Servidor backend
- Axios → Consumir la API de países
- HTML, CSS, JavaScript → Frontend
- REST Countries API → Datos de los países
- Render → Despliegue del servidor

---

##  Endpoints del backend

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/pregunta` | Devuelve una nueva pregunta aleatoria |
| `POST` | `/api/guardarResultado` | Guarda el resultado del jugador |
| `GET` | `/api/ranking` | Muestra los mejores 20 jugadores |


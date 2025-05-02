const playerForm = document.getElementById('playerForm');
const playerNameInput = document.getElementById('playerName');
const nameError = document.getElementById('nameError');
const rankingBtn = document.getElementById('rankingBtn');

//vadilacion del nombre del Jugador (Player)
playerForm.addEventListener('submit', (event) => {
    event.preventDefault(); //previene que se envíe el formulario
    const playerName = playerNameInput.value.trim();
    if (playerName === '' || playerName.length > 30) {
        nameError.innerHTML="Por favor ingresa un nombre válido (máximo 30 caracteres)";
        nameError.style.display = 'block';
        return;
    }else{
        nameError.style.display = 'none'; 
    }
    alert(`${playerName} Nombre Válido, Buena Suerte!`);
});

// Proximamente se mostrara el ranking de los mejores 20 jugadores
rankingBtn.addEventListener('click', () => {
    alert('Mostrando ranking de los mejores 20 jugadores');
    
});
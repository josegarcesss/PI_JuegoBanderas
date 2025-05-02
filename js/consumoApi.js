// solicitud de un pais aleatorio
fetch('http://localhost:3000/pais-aleatorio')
  .then(response => response.json())
  .then(data => {
    console.log('País aleatorio:', data);

  })
  .catch(error => console.error('Error al obtener el país:', error));
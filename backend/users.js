const fs = require('fs');
const path = require('path');

const ARCHIVO_USERS = path.join(__dirname, 'datos', 'users.json');

function cargarUsers() {
    if (!fs.existsSync(ARCHIVO_USERS)) {
        fs.writeFileSync(ARCHIVO_USERS, JSON.stringify([]));
    }
    const datos = fs.readFileSync(ARCHIVO_USERS, 'utf8');
    return JSON.parse(datos);
}

function guardarUser(user) {
    const users = cargarUsers();
    users.push(user);
    fs.writeFileSync(ARCHIVO_USERS, JSON.stringify(users, null, 2));
}

module.exports = { cargarUsers, guardarUser };
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    nombre: String,
    contrasena: String,
    rol: [],
    email: String,
    telefono: String,
    imagen: {type: String, default: 'http://localhost:3000/images/profile-default.png'},
    sucursal: {type: String, default: 'none'},
    pais: String,
    estado: String,
    ciudad: String,
    colonia: String,
    calle: String,
    fecha: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('UsuarioSchema', UsuarioSchema);

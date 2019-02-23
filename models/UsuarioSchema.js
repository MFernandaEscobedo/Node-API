'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    nombre: String,
    contraseña: String,
    rol: {type: String, enum: ['empleado', 'administrador']},
    email: String,
    telefono: String,
    imagen: String,
    domicilio: String,
    fecha: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('UsuarioSchema', UsuarioSchema);
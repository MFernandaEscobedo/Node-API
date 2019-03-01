'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProveedorSchema = Schema({
    telefono_empresa: String,
    nombre_empresa: String,
    email_empresa: String,
    pais: String,
    estado: String,
    ciudad: String,
    domicilio: String,
    telefono: String,
    nombre: String,
    email: String,
    fecha: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('ProveedorSchema', ProveedorSchema);
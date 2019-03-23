'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SucursalSchema = Schema({
  nombre: String,
  pais: String,
  estado: String,
  ciudad: String,
  direccion: String,
  sucursal: {type: String, default: 'none'},
  fecha: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('SucursalSchema', SucursalSchema);

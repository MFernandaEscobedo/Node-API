'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = Schema({
  empleado: {
    nombre: String,
    id: String
  },
  fecha: {type: Date},
  numero_venta: Number,
  total: Number,
  productos: [],
  sucursal: {type: String, default: 'none'}
});

module.exports = mongoose.model('VentaSchema', VentaSchema);

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = Schema({
  proveedor: {
    nombre: String,
    id: String
  },
  fecha: {type: Date, default: Date.now()},
  numero_venta: Number,
  total: Number,
  productos: [],
  marca: {type: Boolean, default: false},
  comentario_marca: {type: String, default: ''}
});

module.exports = mongoose.model('VentaSchema', VentaSchema);

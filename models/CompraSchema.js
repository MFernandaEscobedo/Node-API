'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompraSchema = Schema({
    proveedor: {
      nombre: String,
      id: String
    },
    empleado: {
      nombre: String,
      id: String
    },
    fecha: {type: Date},
    numero_compra: Number,
    total: Number,
    productos: [],
    sucursal: {type: String, default: 'none'}
});

module.exports = mongoose.model('CompraSchema', CompraSchema);

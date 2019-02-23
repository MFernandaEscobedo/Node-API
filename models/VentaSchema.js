'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = Schema({
    numero_factura: Number,
    total: Number,
    fecha: {type: Date, default: Date.now()},
    id_usuario: String,
    productos: []
});

module.exports = mongoose.model('VentaSchema', VentaSchema);
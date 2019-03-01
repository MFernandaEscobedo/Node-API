'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompraSchema = Schema({
    id_proveedor: String,
    fecha: {type: Date, default: Date.now()},
    numero_compra: Number,
    total: Number,
    productos: []
});

module.exports = mongoose.model('CompraSchema', CompraSchema);
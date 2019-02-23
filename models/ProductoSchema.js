'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    codigo: String,
    nombre: String,
    stock: Number,
    costo: Number,
    utilidad: Number,
    precio_venta: Number,
    modelo: Number,
    descripcion: String,
    fecha: {type: Date, default: Date.now()},
    categorias: []
});

module.exports = mongoose.model('ProductoSchema', ProductoSchema);
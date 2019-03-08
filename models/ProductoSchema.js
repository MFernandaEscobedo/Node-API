'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    codigo: String,
    nombre: String,
    stock: Number,
    costo: Number,
    stock_minimo: Number,
    stock_maximo: Number,
    utilidad: Number,
    precio_venta: Number,
    presentacion: String,
    imagen: String,
    modelo: String,
    descripcion: String,
    fecha: {type: Date, default: Date.now()},
    categorias: []
});

module.exports = mongoose.model('ProductoSchema', ProductoSchema);
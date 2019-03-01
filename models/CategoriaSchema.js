'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema; //es una funcion

const CategoriaSchema = Schema({
    nombre: String,
    fecha: {type:Date, default: Date.now()}
});

module.exports = mongoose.model('CategoriaSchema', CategoriaSchema);

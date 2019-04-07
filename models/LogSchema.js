'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  empleado: {
    nombre: String,
    id: String
  },
  usuario: {
    nombre: String,
    id: String
  },
  fecha: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('LogSchema', LogSchema);

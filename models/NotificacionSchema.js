'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificacionSchema = new Schema({
  mensaje: String,
  remitente: {
    id: {type: String, default: ''},
    nombre: {type: String, default: ''},
    imagen: {type: String, default: ''}
  },
  destinatario: {
    id: {type: String, default: ''},
    nombre: {type: String, default: ''},
    imagen: {type: String, default: ''}
  },
  sucursal: {type: String, default: 'none'},
  fecha: {type:Date, default: Date.now()}
});

module.exports = mongoose.model('NotificacionSchema', NotificacionSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CobranzaSchema = Schema({
    provider: {
        nombre: String,
        id: String
    },
    total: Number,
    abonos: [],
    fecha: {type: Date, defaults: Date.now()}
});

module.exports = mongoose.model('CobranzaSchema', CobranzaSchema);
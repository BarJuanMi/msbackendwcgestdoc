const { Schema, model } = require('mongoose');

const TipoAusentismoSchema = new Schema({
    tipoausentismoId: { type: String },
    tipoausentismoDesc: { type: String },
}, {
    collection: 'tipoausentismos'
});

module.exports = model('TipoAusentismo', TipoAusentismoSchema);
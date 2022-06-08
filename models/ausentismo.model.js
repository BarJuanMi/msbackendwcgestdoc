var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ausentismoSchema = new Schema({
    empleado: { type: Schema.Types.ObjectId, ref: 'Empleado' },
    usuarioRegistro: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    usuarioActualiza: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    estado: { type: String, required: [true, 'El estado es necesario'] },
    emplNomApel: { type: String, required: true },
    fechaRegistro: { type: Date, default: Date.now },
    observaciones: { type: String, required: false },
    observacionesActualiza: { type: String, required: false },
    fechaActualiza: { type: Date, required: false },
    tipo: { type: Schema.Types.ObjectId, ref: 'TipoAusentismo' },
}, {
    collection: 'ausentismos'
});

module.exports = mongoose.model('Ausentismo', ausentismoSchema);
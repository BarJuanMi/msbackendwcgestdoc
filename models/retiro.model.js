const { Schema, model } = require('mongoose');

var retiroSchema = new Schema({
    empleado: { type: Schema.Types.ObjectId, ref: 'Empleado' },
    usuarioCreacion: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    fechaRenuncia: { type: Date, required: false },
    estado: { type: String, required: [true, 'El estado es necesario'] },
    motivoRetiro: { type: String, required: [true, 'El motivo es necesario'] },
    entrevista: { type: Boolean, default: false },
    encuesta: { type: Boolean, default: false },
    fechaRegistro: { type: Date, default: Date.now },
    fechaFirma: { type: String, required: false },
    fechaCargoPDF: { type: Date, required: false },
    usuarioCargoPDF: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    pathPDF: { type: String, required: false },
    estadoCargoPDF: { type: Boolean, default: false }
}, {
    collection: 'retiros'
});


module.exports = model('Retiro', retiroSchema);
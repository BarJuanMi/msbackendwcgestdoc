const { Schema, model, now } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    role: { type: String, required: true, default: 'USER_ROLE' },
    google: { type: Boolean, default: false },
    fechaCreacion: { type: Date, default: Date.now },
    estado: { type: String, required: [true, 'El estado es necesario'], default: 'CREADO' }
});

// Esto { __v, ...object }
// no permite que se extraiga lo que esta 
// entre los corchetes, es decir ignora todo eso
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);
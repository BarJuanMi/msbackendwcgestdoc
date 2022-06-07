const { Schema, model } = require('mongoose');

var rhValido = {
    values: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    message: '{VALUE} no es un rh permitido'
}

var generoValido = {
    values: ['FEMENINO', 'MASCULINO', 'INDETERMINADO'],
    message: '{VALUE} no es un genero permitido'
}

const EmpleadoSchema = new Schema({
    documento: { type: String, unique: true, required: [true, 'El numero de documento es necesario'] },
    tipoDocumento: { type: String, required: [true, 'El tipo de documento es necesario'] },
    genero: { type: String, required: true, default: 'F', enum: generoValido },
    nombres: { type: String, required: [true, 'El nombre es necesario'] },
    apellidos: { type: String, required: [true, 'El apellido es necesario'] },
    nombApellConca: { type: String, required: [true, 'La concatenacion de nombres y apellidos es necesario'] },
    tipoEmpleado: { type: Schema.Types.ObjectId, ref: 'Tipoempleado' },
    fechaNac: { type: Date, required: [true, 'La fecha de nacimiento es necesaria'] },
    direccion: { type: String, required: [true, 'La direccion de residencia es necesaria'] },
    emailCorporativo: { type: String, required: [true, 'La direccion de email es necesaria'] },
    telCelular: { type: String, required: [true, 'La telefóno celular es necesario'] },
    rh: { type: String, required: true, default: 'O+', enum: rhValido },
    nomContEmer: { type: String, required: [true, 'El nombre del contacto de emergencia es necesario'] },
    telContEmer: { type: String, required: [true, 'El telefono del contacto de emergencia es necesario'] },
    fechaIngreso: { type: Date, required: [true, 'La fecha de ingreso es necesaria'] },
    estado: { type: Boolean, default: true, required: [true, 'El estado de la modelo en la app es necesario'] },
    numHijos: { type: Number, default: 0, },
    entidadBanco: { type: String, default: 'No Aplica' },
    numCuentaBanco: { type: String, default: 'xxxxxx' },
    nacionalidad: { type: Schema.Types.ObjectId, ref: 'Pais' },
    ciudadResidencia: { type: Schema.Types.ObjectId, ref: 'Ciudad' },
    img: { type: String, required: false },
    numHuellero: { type: Number, required: false },
    fechaInactivacion: { type: Date },
    fechaCreacionApp: { type: Date, default: Date.now },
    usuarioCreacion: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    epsSalud: { type: String, required: true },
    arlTrabajo: { type: String, required: true },
}, {
    collection: 'empleados'
});

module.exports = model('Empleado', EmpleadoSchema);
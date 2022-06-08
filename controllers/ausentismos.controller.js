const { response } = require('express');
const Ausentismo = require('../models/ausentismo.model');
const Empleado = require('../models/empleado.model');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAusentismos = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0; // comienza a paginar desde el registro 10 en adelante, recordar que le numeracion comienza en 0
    const [ausentismos, total] = await Promise.all([
        //Promesa 1
        //Los filtros de los campos a mostrar se controlan desde el modelo
        Ausentismo.find({}) //solo me muestra en el resutlado de la consulta las columnas
        .skip(desde)
        .populate('empleado', 'documento nombApellConca')
        .populate('usuarioRegistro', 'nombre')
        .populate('usuarioActualiza', 'nombre')
        .populate('tipo', 'tipoausentismoDesc')
        .sort({ fechaCreacion: -1 })
        .limit(Number(process.env.LIMIT_QUERY_AUSENTISMOS)),

        //Promesa 2
        Ausentismo.countDocuments()
    ]);

    res.json({
        status: true,
        ausentismos,
        total
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const crearRegAusentismos = async(req, res = response) => {

    try {
        const uid = req.uid; //Saca el uid (identificador del usuario dentro del token de la peticion)
        req.body.usuario = uid;

        const ausentismoNew = new Ausentismo({
            usuarioRegistro: uid,
            ...req.body
        });

        const idEmpleadoDB = await Empleado.findById(req.body.empleado);

        ausentismoNew.estado = 'CREADO / CARGADO';
        ausentismoNew.emplNomApel = idEmpleadoDB.nombres + ' ' + idEmpleadoDB.apellidos;

        const ausentismoRet = await ausentismoNew.save();

        res.json({
            status: true,
            ausentismoRet
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: true,
            msg: 'Error durante la creación del registro de ausentismo - Ver logs'
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const buscarRegAusentismoId = async(req, res = response) => {

    const idAusentismo = req.params.id;
    try {
        const ausentismoRet = await Ausentismo
            .findById(idAusentismo)
            .populate('usuario', 'nombre')
            .populate('usuarioActualiza', 'nombre');

        if (!ausentismoRet) {
            return res.status(400).json({
                status: false,
                msg: 'No existe el registro de ausentismo con ese id'
            });
        }

        res.json({
            status: true,
            ausentismo: ausentismoRet
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: true,
            msg: 'Error durante la busqueda particular del registro de ausentismo - Ver logs'
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const actualizarRegAusentismo = async(req, res = response) => {

    const uid = req.uid;
    const idAusentismo = req.params.id;
    try {
        const resAusentismoDB = await Ausentismo.findById(idAusentismo);

        if (!resAusentismoDB) {
            return res.status(400).json({
                status: false,
                msg: 'No existe el registro de ausentismo con ese id'
            });
        }

        req.body.usuarioActualiza = uid;
        req.body.fechaActualizacion = '' + new Date();

        const { fechaCreacion, modelo, monto, observaciones, usuario, ...campos } = req.body;

        const ausentismoActualizado = await Ausentismo.findByIdAndUpdate(idAusentismo, campos, { new: true });

        res.json({
            status: true,
            ausentismo: ausentismoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: true,
            msg: 'Error durante la actualizacion del registro de ausentismo - Ver logs'
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const eliminarRegAusentismo = async(req, res = response) => {

    const idAusentismo = req.params.id;
    try {
        const resAusentismoDB = await Ausentismo.findById(idAusentismo);

        if (!resAusentismoDB) {
            return res.status(400).json({
                status: false,
                msg: 'No existe el registro de ausentismo con ese id'
            });
        }

        const ausentismoEliminado = await Ausentismo.findByIdAndDelete(idAusentismo);

        res.json({
            status: true,
            msg: 'Registro de ausentismo eliminado correctamente',
            ausentismo: ausentismoEliminado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Error durante la eliminacion del registro de ausentismo - Ver logs'
        });
    }
}

module.exports = {
    getAusentismos,
    crearRegAusentismos,
    buscarRegAusentismoId,
    actualizarRegAusentismo,
    eliminarRegAusentismo
}
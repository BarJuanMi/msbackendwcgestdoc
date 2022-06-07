/*
    Ruta: /api/retiros
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearRetiro, getRetiros, actualizarRetiro, buscarRetiroPorId, eliminarRetiro } = require('../controllers/retiros.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getRetiros);

router.post('/crearRetiro', validarJWT, crearRetiro);

router.get('/buscarRetiroId/:id', validarJWT, buscarRetiroPorId);

router.put('/actualizarRetiro/:id', validarJWT, actualizarRetiro);

router.delete('/eliminarRetiro/:id', validarJWT, eliminarRetiro);

module.exports = router;
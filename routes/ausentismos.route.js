/*
    Ruta: /api/ausentismos
*/
const { Router } = require('express');
const { getAusentismos, crearRegAusentismos, buscarRegAusentismoId, actualizarRegAusentismo, eliminarRegAusentismo } = require('../controllers/ausentismos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getAusentismos);

router.post('/crearRegAusentismo', validarJWT, crearRegAusentismos);

router.get('/buscarRegAusentismoId/:id', validarJWT, buscarRegAusentismoId);

router.put('/actualizarRegAusentismo/:id', validarJWT, actualizarRegAusentismo);

router.delete('/eliminarRegAusentismo/:id', validarJWT, eliminarRegAusentismo);

module.exports = router;
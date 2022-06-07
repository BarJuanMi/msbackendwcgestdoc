const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // Leer el token
    const tokenObtenido = req.header('x-token');

    if (!tokenObtenido) {
        return res.status(401).json({
            status: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(tokenObtenido, process.env.JWT_SECRET_KEY);
        req.uid = uid;

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: false,
            msg: 'Token no válido'
        });
    }
    next();
}

module.exports = {
    validarJWT
}
require('dotenv').config();
const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CONEX, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Conexión satisfactoria a la BD');

    } catch (error) {
        console.log(error);
        throw new Error('Error intentado conectar a la BD');
    }

}

module.exports = {
    dbConnection
}
const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('BD conectada')
    } catch (e) {
        console.log(e);
        throw new Error('Error a la hora de inicializad DB');
    }
}

module.exports = {
    dbConnection
}
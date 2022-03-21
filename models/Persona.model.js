const { Schema, model } = require('mongoose')

const PersonaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cedula: {
        type: Number,
        required: true
    },
    numero_telefono: {
        type: Number,
        required: true
    },
    tipo_identificacion: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});
//convertir _id en id en la peticion get
PersonaSchema.method('toJSON', function () {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    return obj;
});

module.exports = model('Persona', PersonaSchema);
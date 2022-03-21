const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const {
    crearPersona,
    obtenerPersonas,
    buscarPorId,
    actualizarPersona,
    eliminarPersonaPorId,
    eliminarPersonas
} = require('../controllers/persona.controller');

const router = Router();

//Crear nueva persona
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    check('numero_telefono', 'El numero de telefono es obligatorio').not().isEmpty(),
    check('tipo_identificacion', 'El tipo de identificacion es obligatorio').not().isEmpty(),
    validarCampos
], crearPersona);

// Obtener todas las personas
router.get("/", obtenerPersonas);

// Obtener una sola persona con id
router.get("/:id", buscarPorId);

// Actualizar una persona con id
router.put("/:id", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    check('numero_telefono', 'El numero de telefono es obligatorio').not().isEmpty(),
    check('tipo_identificacion', 'El tipo de identificacion es obligatorio').not().isEmpty(),
    validarCampos
], actualizarPersona);

// Eliminar una persona con id
router.delete("/:id", eliminarPersonaPorId);

// Eliminar todas las personas
router.delete("/", eliminarPersonas);

module.exports = router;
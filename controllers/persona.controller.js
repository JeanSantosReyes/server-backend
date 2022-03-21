const { response, request } = require('express');
const Persona = require('../models/Persona.model');

// Crear Persona
const crearPersona = async (req = request, res = response) => {
    const { email } = req.body;
    try {
        // Verificar email unico
        const persona = await Persona.findOne({ email });
        if (persona) {
            return res.status(400).json({
                ok: false,
                msg: 'La persona ya existe con ese email'
            });
        }
        // Crear persona con el modelo
        const dbPersona = new Persona(req.body);
        // Crear persona en la BD
        await dbPersona.save();
        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            msg: 'Persona creada exitosamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Porfavor contactese con el administrador',
        });
    }
}

// Obtener todos las personas
const obtenerPersonas = async (req = request, res = response) => {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: 'i' } } : {};
    try {
        const personas = await Persona.find(condition);
        return res.json(personas);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Se produjo un error al recuperar los tutoriales.'
        });
    }
}

// Buscar persona por id
const buscarPorId = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const persona = await Persona.findById(id);
        if (!persona) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona no encontrada con el id: ' + id
            })
        } else {
            return res.json(persona);
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al recuperar Usuario con id= ' + id
        });
    }
}

// Actualizar persona por ID
const actualizarPersona = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const personaUpdate = await Persona.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        if (!personaUpdate) {
            return res.status(404).json({
                ok: false,
                msg: `No se puede actualizar persona con id= ${id}. Tal vez la persona no fue encontrado!`
            });
        } else {
            return res.json({
                ok: true,
                msg: 'La persona se actualizó con éxito.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar Persona con id= ' + id
        });
    }
}

// Eliminar persona por id
const eliminarPersonaPorId = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const persona = await Persona.findByIdAndRemove(id);
        if (!persona) {
            return res.status(404).json({
                ok: false,
                msg: `No se puede eliminar Persona con id= ${id}. Tal vez la persona no fue encontrado!`
            });
        } else {
            return res.json({
                ok: true,
                msg: 'La persona se elimino con exito'
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo eliminar Persona con id= ' + id
        });
    }
}

// Eliminar todos los usuarios
const eliminarPersonas = async (req = request, res = response) => {
    try {
        const personas = await Persona.deleteMany({});
        return res.json({
            ok: true,
            msg: `${personas.deletedCount} Personas se han eliminado con exito.`
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Se produjo un error al eliminar todas las personas.'
        });
    }
}

module.exports = {
    crearPersona,
    obtenerPersonas,
    buscarPorId,
    actualizarPersona,
    eliminarPersonaPorId,
    eliminarPersonas
}
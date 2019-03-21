'use strict';

const UsuarioSchema = require('./../models/UsuarioSchema');

function getUsuarios(req, res) {
    UsuarioSchema.find({}, (err, usuarios) => {
        if(err) {
            res.status(500).send(`error al obtener los usuarios: ${err}`);
        }
        res.status(200).send(usuarios);
    });
}

function getUsuarioById(req, res) {
    const id = req.params.id;
    UsuarioSchema.findOne({"_id": id}, (err, usuario) => {
        if(err) {
            res.status(500).send(`error al obtener el usuario: ${err}`);
        }
        res.status(200).send(usuario);
    });
}

function postUsuario(req, res) {
    const datos = req.body;
    let usuario = new UsuarioSchema();
    usuario.nombre = datos.nombre;
    usuario.contrasena = datos.contrasena;
    usuario.rol = datos.rol;
    usuario.email = datos.email;
    usuario.telefono = datos.telefono;
    // usuario.imagen = datos.imagen;
    usuario.domicilio = datos.domicilio;

    usuario.save((err, userStore) => {
        if(err) {
            res.status(500).send(`error al guardar nuevo usuario: ${err}`);
        }
        res.status(200).send(userStore);
    });
}

function putUsuario(req, res) {
    const id = req.params.id;
    const datosActualizados = req.body;
    UsuarioSchema.findOneAndUpdate({"_id": id}, datosActualizados, {new: true}, (err, updatedUser) => {
        if(err) {
            res.status(500).send(`error al actualizar al usuario: ${err}`);
        }
        res.status(200).send(updatedUser);
    });
}

function deleteUsuario(req, res) {
    const id = req.params.id;
    UsuarioSchema.findOneAndDelete({"_id": id}, (err, deletedUser) => {
        if(err) {
            res.status(500).send(`error al eliminar al usuario: ${err}`);
        }
        res.status(200).send(deletedUser);
    });
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    postUsuario,
    putUsuario,
    deleteUsuario
}

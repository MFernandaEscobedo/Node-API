'use strict';

const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');

function getUsuarios(req, res) {
    UsuarioSchema.find({}, (err, usuarios) => {
        if(err) {
            res.status(500).send(`error al obtener los usuarios: ${err}`);
        }
        res.status(200).send(usuarios);
    });
}

function login(req, res) {
  let userData = req.body;
  UsuarioSchema.findOne({email: userData.email, contrasena: userData.contrasena}, (err, user) => {
    if(err) {
        res.status(500).send(`error: ${err}`);
    } else if(!user) {
      res.status(401).send(`error de autenticación`);
    }
    let payload = {
      subject: user._id
    };
    let token = jwt.sign(payload, 'clavesecreta');
    console.log(jwt);
    res.status(200).send({token});
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

function verifyPermissionCategory(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        res.status(500).send('error al decodificar el token');
      }
      for(let i = 0; i < user.rol.length; i++) {
        if(user.rol[i].modulo === 'categorias') {
          if(user.rol[i].visualizacion === true) {
            res.status(200).send('este men minimo puede ver categorias');
          }
        }
      }
      res.status(401).send('este men no puede ni ver las categorias');
    });
  }
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
    deleteUsuario,
    login,
    verifyPermissionCategory
}

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
  // hay que verificar que el usuario ya tenga una sucursal
  let userData = req.body;
  UsuarioSchema.findOne({email: userData.email, contrasena: userData.contrasena}, (err, user) => {
    if(err) {
        return res.status(500).send(`error: ${err}`);
    } else if(!user) {
      return res.status(401).send({typeError: 1, msg: 'Error de autenticación'});
    } else {
      if(user.sucursal !== 'none') {
        let payload = {
          subject: user._id
        };
        let token = jwt.sign(payload, 'clavesecreta');
        return res.status(200).send({token, user});
      } else {
        return res.status(401).send({typeError: 5, msg: 'No estas asignado a alguna sucursal'});
      }
    }
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

function verifyPermission(req, res) {
  let permission = req.body.permission;
  let module = req.body.module;
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        res.status(500).end('error al decodificar el token');
      }
      for(let i = 0; i < user.rol.length; i++) {
        if(user.rol[i].modulo === module) {
          if(user.rol[i][permission] === true) {
            return res.status(200).send(true);
          }
        }
      }
      return res.status(401).send(false);
    });
  }
}

function verifyValidToken(req, res) {
  console.log('si')
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        res.status(500).end('error al decodificar el token');
      }
      if(user) {
        return res.status(200).send(true);
      } else {
        return res.status(401).send(false);
      }
    });
  } else {
    return res.status(401).send(false);
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
    verifyValidToken,
    verifyPermission
}

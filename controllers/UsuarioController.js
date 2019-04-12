'use strict';

const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

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
  const pwd = encrypt(userData.contrasena);

  UsuarioSchema.findOne({email: userData.email, contrasena: pwd}, (err, user) => {
    console.log('emai: ' + userData.email + ' pwd: ' + pwd);
    if(err) {
        return res.status(500).send(`error: ${err}`);
    } else if(!user) {
      return res.status(401).send({typeError: 1, msg: 'Error de autenticación'});
    } else {
      if(user.sucursal !== 'none' || user.sucursal === 'admin') {
        let payload = {
          subject: user._id,
          iat: moment().unix(),
          exp: moment().add(7, 'days').unix()
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
  } else {
    return res.status(500).send(false);
  }
}

function verifyValidToken(req, res) {
  console.log('si')
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    console.log(payload.exp, Date.now());
    if(payload.exp <= moment().unix()) {
      return res.status(500).send('el token ha expirado prro tss');
      console.log('el token ha expirado prro');
    } else {
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
    }
  } else {
    return res.status(500).send(false);
  }
}

function encrypt(pass){
  console.log(pass);
  var cipher = crypto.createCipher("aes-256-ctr", 'caveparacifrado');
  var crypted = cipher.update(pass,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(pass){
  var decipher = crypto.createDecipher("aes-256-ctr", 'caveparacifrado');
  var dec = decipher.update(pass,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

function decryptPass(req, res) {
  let contrasena = req.body.contrasena;
  return res.status(200).send({contrasena: decrypt(contrasena)});
}

function postUsuario(req, res) {
    const datos = req.body;
    let usuario = new UsuarioSchema();

    usuario.nombre = datos.nombre;
    usuario.contrasena = encrypt(datos.contrasena);
    usuario.rol = datos.rol;
    usuario.email = datos.email;
    usuario.telefono = datos.telefono;
    UsuarioSchema.find({email: datos.email}, (err, usuarios) => {
      if(err) {
        return res.status(500).send('error al obtener el usuario');
      }
      if(usuarios.length !== 0) {
        return res.status(500).send({type: 'email-utilizado', message: 'Este email ya esta siendo utilizado'});
      } else {
        usuario.save((err, userStore) => {
            if(err) {
                res.status(500).send(`error al guardar nuevo usuario: ${err}`);
            }
            res.status(200).send(userStore);
        });
      }
    });
}

function putUsuario(req, res) {
    const id = req.params.id;
    const datosActualizados = req.body;
    if(datosActualizados.contrasena) {
      datosActualizados.contrasena = encrypt(datosActualizados.contrasena);
    }
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
    verifyPermission,
    decryptPass
}

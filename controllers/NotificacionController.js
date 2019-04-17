'use strict';

const NotificacionSchema = require('./../models/NotificacionSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');

function getNotificaciones(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        return res.status(404).send('no se encontro el usuario');
      }
      if(user) {
        NotificacionSchema.find({}, (err, notificaciones) => {
            if(err) {
                return res.status(500).send(`error al obtener todas los notificaciones: ${err}`);
            }
            return res.status(200).send(notificaciones);
        });
      }
    });
  }
}

function getNotificationById(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    let id = req.params.id;
    NotificacionSchema.find({_id: id}, (err, notificacion) => {
      if(err) {
          res.status(500).send(`error al obtener el notificacion: ${err}`);
      }
      res.status(200).send(notificacion);
    });
  }
}

function postNotificacion(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    let notificacion = new NotificacionSchema();
    const body = req.body;
    notificacion.mensaje = body.mensaje;
    notificacion.sucursal = body.sucursal;
    notificacion.remitente = body.remitente;
    notificacion.destinatario = body.destinatario;

    notificacion.save((err, notificacionStorage) => {
      if(err) {
        res.status(500).send(`error al guardar el notificacion de contraseña: ${err}`);
      }
      res.status(200).send(notificacionStorage);
    });
  }
}

function putNotificacion(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let id = req.params.id;
    let body = req.body;
    NotificacionSchema.findOneAndUpdate({_id: id}, body, {new: true}, (err, updatedNotificacion) => {
      if(err) {
        res.status(500).send(`error al actualizar el notification: ${err}`);
      }
      res.status(200).send(updatedNotificacion);
    });
  }
}

function deleteNotificacion(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let id = req.params.id;
    NotificacionSchema.findOneAndDelete({"_id": id}, (err, deletedNotificacion) => {
      if(err) {
        res.status(500).send(`error al eliminar la notificacion: ${err}`);
      }
      res.status(200).send(deletedNotificacion);
    });
  }
}

module.exports = {
  getNotificaciones,
  getNotificationById,
  postNotificacion,
  putNotificacion,
  deleteNotificacion
}

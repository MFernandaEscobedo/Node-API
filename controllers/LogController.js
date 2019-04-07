'use strict';

const LogSchema = require('./../models/LogSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');

function getLogs(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        return res.status(404).send('no se encontro el usuario');
      }
      if(user) {
        LogSchema.find({}, (err, logs) => {
            if(err) {
                return res.status(500).send(`error al obtener todas los logs de contraseñas: ${err}`);
            }
            return res.status(200).send(logs);
        });
      }
    });
  }
}

function getLogById(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    let id = req.params.id;
    LogSchema.find({_id: id}, (err, log) => {
      if(err) {
          res.status(500).send(`error al obtener el log de contraseñas: ${err}`);
      }
      res.status(200).send(log);
    });
  }
}

function postLog(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    let log = new LogSchema();
    const body = req.body;
    log.empleado = body.empleado;
    log.usuario = body.usuario;

    log.save((err, logStorage) => {
      if(err) {
        res.status(500).send(`error al guardar el log de contraseña: ${err}`);
      }
      res.status(200).send(logStorage);
    });
  }
}

function putLog(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let id = req.params.id;
    let body = req.body;
    LogSchema.findOneAndUpdate({_id: id}, body, {new: true}, (err, updatedLog) => {
      if(err) {
        res.status(500).send(`error al actualizar el log de contraseña: ${err}`);
      }
      res.status(200).send(updatedLog);
    });
  }
}

function deleteLog(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let id = req.params.id;
    LogSchema.findOneAndDelete({"_id": id}, (err, deletedLog) => {
      if(err) {
        res.status(500).send(`error al eliminar el log de contraseña: ${err}`);
      }
      res.status(200).send(deletedLog);
    });
  }
}

module.exports = {
  getLogs,
  getLogById,
  postLog,
  putLog,
  deleteLog
}

'use strict';

const CobranzaSchema = require('./../models/CobranzaSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');

function getPayments(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        return res.status(404).send('no se encontro el usuario');
      }
      if(user) {
        CobranzaSchema.find({}, (err, abonos) => {
            if(err) {
                return res.status(500).send(`error al obtener todas los abonos: ${err}`);
            }
            return res.status(200).send(abonos);
        });
      }
    });
  }
}

function getPaymentById(req, res) {
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

function postPayment(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    let abono = new CobranzaSchema();
    const body = req.body;
    abono.proveedor = body.proveedor;
    abono.total = body.total;
    abono.abonos = [];


    log.save((err, abonoStore) => {
      if(err) {
        res.status(500).send(`error al guardar el abono: ${err}`);
      }
      res.status(200).send(abonoStore);
    });
  }
}

function putPayment(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let id = req.params.id;
    let body = req.body;
    CobranzaSchema.findOneAndUpdate({_id: id}, body, {new: true}, (err, abonoUpdated) => {
      if(err) {
        res.status(500).send(`error al actualizar el abono: ${err}`);
      }
      res.status(200).send(abonoUpdated);
    });
  }
}

function deletePayment(req, res) {
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
    getPayments,
    getPaymentById,
    postPayment,
    putPayment,
    deletePayment
}
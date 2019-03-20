'use strict';

const SucursalSchema from './../models/SucursalSchema';

function getSucursales(req, res) {
  SucursalSchema.find({}, (err, sucuarsales) => {
    if(err) {
      res.status(500).send(`error al obtener todas las sucuarsales: ${err}`);
    }
    res.status(200).send(sucuarsales);
  });
}

function getSucursalById(req, res) {
  let id = req.params.id;
  SucursalSchema.findById(id, (err, sucursal) => {
    if(err) {
        res.status(500).send(`error al obtener la sucursal: ${err}`);
    }
    res.status(200).send(sucursal);
  });
}

function postSucursal(req, res) {
  let sucuarsal = new SucursalSchema();
  const body = req.body;
  sucursal.nombre = body.nombre;
  sucursal.pais = body.pais;
  sucursal.estado = body.estado;
  sucursal.direccion = body.direccion;

  sucursal.save((err, sucursalStorage) => {
    if(err) {
      res.status(500).send(`error al guardar la sucursal: ${err}`);
    }
    res.status(200).send(sucursalStorage);
  });
}

function putSucursal(req, res) {
  let id = req.params.id;
  let body = req.body;
  SucursalSchema.findOneAndUpdate({"_id":id}, body, {new: true} (err, updatedSucursal) => {
    if(err) {
      res.status(500).send(`error al actualizar la sucursal: ${err}`);
    }
    res.status(200).send(updatedSucursal);
  });
}

function deleteSucursal(req, res) {
  let id = req.params.id;
  SucursalSchema.findOneAndDelete({"_id": id}, (err, deletedSucursal) => {
    if(err) {
      res.status(500).send(`error al eliminar la sucursal: ${err}`);
    }
    res.status(200).send(deletedSucursal);
  });
}
module.exports = {
  getSucursales,
  getSucursalById,
  postSucursal,
  putSucursal,
  deleteSucursal
}

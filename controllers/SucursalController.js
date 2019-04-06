'use strict';

const SucursalSchema  =  require('./../models/SucursalSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');

function getSucursales(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        return res.status(404).send('no se encontro el usuario');
      }
      if(user) {
        SucursalSchema.find({}, (err, sucursales) => {
            if(err) {
                return res.status(500).send(`error al obtener todas las sucursales: ${err}`);
            }
            return res.status(200).send(sucursales);
        });
      }
    });
  }
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
  let sucursal = new SucursalSchema();
  const body = req.body;
  sucursal.nombre = body.nombre;
  sucursal.pais = body.pais;
  sucursal.estado = body.estado;
  sucursal.ciudad = body.ciudad;
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
  SucursalSchema.findOneAndUpdate({_id: id}, body, {new: true}, (err, updatedSucursal) => {
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

async function findSucursal(req, res) {
    let value = req.params.valor;
    // cursor = db.ciudades.find({$or:[{ciudad:/^M/},{ciudad:/^Z/}]});
    /*
    { $or:[{nombre: {$regex: ".*" + value + ".*", $options: "mi"}},
    {ciudad: {$regex: ".*" + value + ".*", $options: "mi"}}]}
    */
    SucursalSchema.find({ $or:[{nombre: {$regex: ".*" + value + ".*", $options: "mi"}},
    {ciudad: {$regex: ".*" + value + ".*", $options: "mi"}},
    {estado: {$regex: ".*" + value + ".*", $options: "mi"}},
    {pais: {$regex: ".*" + value + ".*", $options: "mi"}}]}, (err, sucursales) => {
        if(err) {
            res.status(500).send('error al buscar sucursales');
        }
        res.status(200).send(sucursales);
    });
}

module.exports = {
  getSucursales,
  getSucursalById,
  postSucursal,
  putSucursal,
  deleteSucursal,
  findSucursal
}

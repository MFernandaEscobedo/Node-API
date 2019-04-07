'use strict';

const ProveedorSchema = require('./../models/ProveedorSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');

function getProveedores(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        return res.status(404).send('no se encontro el usuario');
      }
      if(user) {
        ProveedorSchema.find({sucursal: user.sucursal}, (err, proveedores) => {
            if(err) {
                res.status(500).send(`error al obtener los proveedores: ${err}`);
            }
            res.status(200).send(proveedores);
        });
      }
    });
  }
}

function getProveedorById(req, res) {
    const id = req.params.id;
    ProveedorSchema.findOne({"_id": id}, (err, proveedor) => {
        if(err) {
            res.status(500).send(`error al obtener al proveedor: ${err}`);
        }
        res.status(200).send(proveedor);
    });
}

function postProveedor(req, res) {
    const datos = req.body;
    let proveedor = new ProveedorSchema();
    proveedor.telefono_empresa = datos.telefono_empresa;
    proveedor.nombre_empresa = datos.nombre_empresa;
    proveedor.email_empresa = datos.email_empresa;
    proveedor.pais = datos.pais;
    proveedor.estado = datos.estado;
    proveedor.ciudad = datos.ciudad;
    proveedor.domicilio = datos.domicilio;
    proveedor.telefono = datos.telefono;
    proveedor.nombre = datos.nombre;
    proveedor.email = datos.email;
    proveedor.sucursal = datos.sucursal;

    proveedor.save((err, storeProvider) => {
        if(err) {
            res.status(500).send(`error al guardar al proveedor: ${err}`);
        }
        res.status(200).send(storeProvider);
    });
}

function putProveedor(req, res) {
    const id = req.params.id;
    const datosActualizados = req.body;
    ProveedorSchema.findOneAndUpdate({"_id": id}, datosActualizados, {new: true}, (err, updatedProvider) => {
        if(err) {
            res.status(500).send(`error al actualizar al proveedor: ${err}`);
        }
        res.status(200).send(updatedProvider);
    });
}

function deleteProveedor(req, res) {
    const id = req.params.id;
    ProveedorSchema.findOneAndDelete({"_id": id}, (err, deletedProvider) => {
        if(err) {
            res.status(500).send(`error al eliminar al proveedor: ${err}`);
        }
        res.status(200).send(deletedProvider);
    });
}

async function findProvider(req, res) {
    let value = req.params.valor;
    ProveedorSchema.find({$or: [{nombre: {$regex: ".*" + value + ".*", $options: "mi"}},
    {nombre_empresa: {$regex: ".*" + value + ".*", $options: "mi"}},
    {pais: {$regex: ".*" + value + ".*", $options: "mi"}},
    {estado: {$regex: ".*" + value + ".*", $options: "mi"}},
    {ciudad: {$regex: ".*" + value + ".*", $options: "mi"}},
    {domicilio: {$regex: ".*" + value + ".*", $options: "mi"}},
    {email_empresa: {$regex: ".*" + value + ".*", $options: "mi"}},
    {email: {$regex: ".*" + value + ".*", $options: "mi"}},
    {telefono: {$regex: ".*" + value + ".*", $options: "mi"}},
    {telefono_empresa: {$regex: ".*" + value + ".*", $options: "mi"}}]}, (err, proveedores) => {
        if(err) {
            res.status(500).send('error al buscar proveedores');
        }
        res.status(200).send(proveedores);
    });
}

module.exports = {
    getProveedores,
    getProveedorById,
    postProveedor,
    putProveedor,
    deleteProveedor,
    findProvider
}

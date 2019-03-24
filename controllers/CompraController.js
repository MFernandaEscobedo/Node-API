'use strict';

const CompraSchema = require('./../models/CompraSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');

function getCompras(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        return res.status(404).send('no se puede encontrar e usuario');
      }
      if(user) {
        CompraSchema.find({sucursal: user.sucursal}, (err, compras) => {
            if(err) {
                return res.status(500).send(`error al obtener las compras: ${err}`);
            }
            return res.status(200).send(compras);
        });
      }
    });
  }
}

function getCompraById(req, res) {
    const id = req.params.id;
    CompraSchema.findById(id, (err, compra) => {
        if(err) {
            res.status(500).send(`error al obtener la compra: ${err}`);
        }
        res.status(200).send(compra);
    });
}

async function postCompra(req, res) {
    let compra = new CompraSchema();
    const datos = req.body;
    const compras = await CompraSchema.find();
    const contadorCompras = compras.length;
    compra.proveedor = datos.proveedor;
    compra.numero_compra = contadorCompras + 1;
    compra.total = datos.total;
    compra.productos = datos.productos;
    compra.sucursal = datos.sucursal;

    compra.save((err, buyStore) => {
        if(err) {
            res.status(500).send(`error al guardar nueva compra: ${err}`);
        }
        res.status(200).send(buyStore);
    });
}

function putCompra(req, res) {
    const id = req.params.id;
    let datosActualizados = req.body;
    CompraSchema.findOneAndUpdate({"_id": id}, datosActualizados, {new: true}, (err, updatedPurchase) => {
        if(err) {
            res.status(500).send(`error al actualizar compra: ${err}`);
        }
        res.status(200).send(updatedPurchase);
    });
}

function deleteCompra(req, res) {
    const id = req.params.id;
    CompraSchema.findOneAndDelete({"_id": id}, (err, deletedPurchase) => {
        if(err) {
            res.status(500).send(`error al eliminar compra: ${err}`);
        }
        res.status(200).send(deletedPurchase);
    });
}

module.exports = {
    getCompras,
    getCompraById,
    postCompra,
    putCompra,
    deleteCompra
}

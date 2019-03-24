'use strict';

const VentaSchema = require('./../models/VentaSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');

function getVentas(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        return res.status(500).send('error al obtener el usuario');
      }
      if(user) {
        VentaSchema.find({sucursal: user.sucursal}, (err, ventas) => {
            if(err) {
                res.status(500).send(`error al obtener las ventas: ${err}`);
            }
            res.status(200).send(ventas);
        });
      }
    });
  }
}

function getVentaById(req, res) {
    const id = req.params.id;
    VentaSchema.findOne({"_id": id}, (err, venta) => {
        if(err) {
            res.status(500).send(`error al obtener la venta: ${err}`);
        }
        res.status(200).send(venta);
    });
}

async function postVenta(req, res) {
  let venta = new VentaSchema();
  const datos = req.body;
  const ventas = await VentaSchema.find();
  const contadorVentas = ventas.length;
  venta.empleado = datos.empleado;
  venta.numero_venta = contadorVentas + 1;
  venta.total = datos.total;
  venta.productos = datos.productos;
  venta.sucursal = datos.sucursal;

  venta.save((err, saleStore) => {
      if(err) {
          res.status(500).send(`error al guardar nueva venta: ${err}`);
      }
      res.status(200).send(saleStore);
  });
}

function putVenta(req, res) {
    const id = req.params.id;
    const datosActualizados = req.body;
    VentaSchema.findOneAndUpdate({"_id": id}, datosActualizados, {new: true}, (err, updatedSale) => {
        if(err) {
            res.status(500).send(`error al actualizar la venta: ${err}`);
        }
        res.status(200).send(updatedSale);
    });
}

function deleteVenta(req, res) {
    const id = req.params.id;
    VentaSchema.findOneAndDelete({"_id": id}, (err, deletedSale) => {
        if(err) {
            res.status(500).send(`error al eliminar la venta: ${err}`);
        }
        res.status(200).send(deletedSale);
    });
}

module.exports = {
    getVentas,
    getVentaById,
    postVenta,
    putVenta,
    deleteVenta
}

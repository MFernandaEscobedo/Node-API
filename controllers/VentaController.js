'use strict';

const VentaSchema = require('./../models/VentaSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');
const moment = require('moment');

let numeroVenta = 1;

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

async function getMoneyAllSales(req, res) {
  try {
    const sales = await VentaSchema.find();
    let money = 0;
    let salesLength = sales.length;
    sales.forEach((sale, index) => {
      money += sale.total;
    });
    res.status(200).send({money: money, salesLength: salesLength});
  } catch(e) {
    res.status(500).send('no se pudieron obtener las ventas');
  }
}

function getSalesDate(req, res) {

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
  let succesVenta = 0;

  venta.empleado = datos.empleado;
  venta.numero_venta = numeroVenta;
  numeroVenta ++;
  venta.total = datos.total;
  venta.sucursal = datos.sucursal;
  venta.productos = datos.productos;
  let date = new Date();
  date.setHours(date.getHours() - 5);
  venta.fecha = date;

  // verificar que el producto que se quiere vender si tenga stock suficiente
  for(let i = 0; i < datos.productos.length; i++) {
    let producto = datos.productos[i];
    if(Number(producto['cantidad']) <= producto.stock) {
      succesVenta ++;
    }
  }
  if(succesVenta === datos.productos.length) {
    venta.save((err, saleStore) => {
        if(err) {
          return  res.status(500).send(`error al guardar nueva venta: ${err}`);
        }
        return res.status(200).send(saleStore);
    });
  } else {
    return res.status(500).send({type: 'stock', message: 'Producto insuficiente para la venta'});
  }
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
    VentaSchema.findOneAndDelete({_id: id}, (err, deletedSale) => {
        if(err) {
            res.status(500).send(`error al eliminar la venta: ${err}`);
        }
        res.status(200).send(deletedSale);
    });
}

function findVenta(req, res) {
  let value = req.params.valor;
  VentaSchema.find({$or: [{"empleado.nombre": {$regex: ".*" + value + ".*", $options: "mi"}}]}, (err, ventas) => {
    if(err) {
      return res.status(500).send('error al buscar las ventas');
    }
    return res.status(200).send(ventas);
  });
}

function findVentaFecha(req, res) {
  let from = new Date(req.params.from.split(' GMT')[0]);
  from.setHours(from.getHours() - 5);
  let to = new Date(req.params.to.split(' GMT')[0]);
  to.setHours(to.getHours() - 5);
  VentaSchema.find({fecha: {
       $gte: from,
       $lt: to
    }
  }, (err, ventas) => {
    if(err) {
      return res.status(500).send('error al buscar las ventas');
    }
    return res.status(200).send(ventas);
  });
}

module.exports = {
    getVentas,
    getVentaById,
    postVenta,
    putVenta,
    deleteVenta,
    findVenta,
    findVentaFecha,
    getMoneyAllSales
}

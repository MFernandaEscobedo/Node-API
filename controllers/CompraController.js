'use strict';

const CompraSchema = require('./../models/CompraSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');
const moment = require('moment');

let numeroCompra = 1;

function getCompras(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        return res.status(500).send('error al obtener el usuario');
      }
      if(user) {
        CompraSchema.find({sucursal: user.sucursal}, (err, compras) => {
            if(err) {
                res.status(500).send(`error al obtener las compras: ${err}`);
            }
            res.status(200).send(compras);
        });
      }
    });
  }
}

async function getMoneyAllPurchases(req, res) {
  try {
    const purchases = await CompraSchema.find();
    let money = 0;
    let purchasesLength = purchases.length;

    purchases.forEach((purchase, index) => {
      money += purchase.total;
    });
    res.status(200).send({money, purchasesLength});
  } catch(e) {
    res.status(500).send('no se pudieron obtener las compras');
  }
}

function getCompraById(req, res) {
    const id = req.params.id;
    CompraSchema.findOne({"_id": id}, (err, compra) => {
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
  let succesCompra = 0;

  compra.empleado = datos.empleado;
  compra.proveedor = datos.proveedor;
  compra.numero_compra = numeroCompra;
  numeroCompra ++;
  compra.total = datos.total;
  compra.sucursal = datos.sucursal;
  compra.productos = datos.productos;
  let date = new Date();
  date.setHours(date.getHours() - 5);
  compra.fecha = date;

  // verificar que el producto que se quiere comprar no pase del stock maximo
  // si todos los productos no pasan del stock maximo entonces si se puede hacer la compra, si alguno sorepasa tons no se hace la compra
  for(let i = 0; i < datos.productos.length; i++) {
    let producto = datos.productos[i];
    console.log(producto);
    if((Number(producto['cantidad']) + producto.stock) <= producto.stock_maximo) {
      succesCompra ++;
    }
  }
  if(succesCompra === datos.productos.length) {
    compra.save((err, saleStore) => {
        if(err) {
          return  res.status(500).send(`error al guardar nueva compra: ${err}`);
        }
        return res.status(200).send(saleStore);
    });
  } else {
    return res.status(500).send({type: 'stock', message: 'Producto pasa del estock maximo'});
  }
}

function putCompra(req, res) {
    const id = req.params.id;
    const datosActualizados = req.body;
    CompraSchema.findOneAndUpdate({"_id": id}, datosActualizados, {new: true}, (err, updatedPurchase) => {
        if(err) {
            res.status(500).send(`error al actualizar la compra: ${err}`);
        }
        res.status(200).send(updatedPurchase);
    });
}

function deleteCompra(req, res) {
    const id = req.params.id;
    CompraSchema.findOneAndDelete({_id: id}, (err, deletedPurchase) => {
        if(err) {
            res.status(500).send(`error al eliminar la compra: ${err}`);
        }
        res.status(200).send(deletedPurchase);
    });
}

function findCompra(req, res) {
  let value = req.params.valor;
  CompraSchema.find({$or: [{"empleado.nombre": {$regex: ".*" + value + ".*", $options: "mi"}}]}, (err, compras) => {
    if(err) {
      return res.status(500).send('error al buscar las compras');
    }
    return res.status(200).send(compras);
  });
}

function findCompraFecha(req, res) {
  let from = new Date(req.params.from.split(' GMT')[0]);
  from.setHours(from.getHours() - 5);
  let to = new Date(req.params.to.split(' GMT')[0]);
  to.setHours(to.getHours() - 5);
  CompraSchema.find({fecha: {
       $gte: from,
       $lt: to
    }
  }, (err, compras) => {
    if(err) {
      return res.status(500).send('error al buscar las compras');
    }
    return res.status(200).send(compras);
  });
}

module.exports = {
    getCompras,
    getCompraById,
    postCompra,
    putCompra,
    deleteCompra,
    findCompra,
    findCompraFecha,
    getMoneyAllPurchases
}

'use strict';

const VentaSchema = require('./../models/VentaSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const app = require('./../app');
const socket = require('socket.io');
const http = require('http');
const server = http.Server(app);

const io = socket(server);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('update-profile', (data) => {
      console.log('evento al actualizar el perfil')
      socket.emit('detected-update-profile', data);
    });

    socket.on('login', (data) => {
      console.log('login')
      socket.empleado = data._id;
    });

    socket.on('add-sale', (data) => {
      console.log('evento al realizar una venta')
      // debo saber cuales de mis empleados tienen la posibilidad de ver en tiempo real cuando alguien realizar una venta en una sucursal
      io.emit('detected-add-sale', data);
    });
});

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
    if(producto['cantidad'] <= producto.stock) {
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
  console.log(value);
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
    findVentaFecha
}

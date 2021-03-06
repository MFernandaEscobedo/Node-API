'use strict';

const ProductoSchema = require('./../models/ProductoSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');

function getProductos(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if (token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({
      _id: payload.subject
    }, (err, user) => {
      if (err) {
        return res.status(404).send('no se encontro el usuario');
      }
      if (user) {
        ProductoSchema.find({
          sucursal: user.sucursal
        }, (err, productos) => {
          if (err) {
            res.status(500).send(`error al obtener todas los productos: ${err}`);
          }
          res.status(200).send(productos);
        });
      }
    });
  }
}

async function getMoneyFromAllProducts(req, res) {
  try {
    const products = await ProductoSchema.find();
    let money = 0;
    let productsLength = 0;
    products.forEach((product, index) => {
      money += (product.precio_venta * product.stock);
      productsLength += product.stock;
    });
    res.status(200).send({money: money, productLength: productsLength});
  } catch (e) {
    res.status(500).send('no se pudo obtener los usuarios');
  }
}

function getProductosLength(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if (token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({
      _id: payload.subject
    }, (err, user) => {
      if (err) {
        return res.status(404).send('no se encontro el usuario');
      }
      if (user) {
        ProductoSchema.find({
          sucursal: user.sucursal
        }, (err, productos) => {
          if (err) {
            res.status(500).send(`error al obtener todas los productos length: ${err}`);
          }
          let len = productos.length;
          res.status(201).send({
            len
          });
        });
      }
    });
  }
}

function getProductos4(req, res) {
  var num = req.params.num;
  var offset = req.params.offset;
  let token = req.headers['authorization'].split(' ')[1];
  if (token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({
      _id: payload.subject
    }, async (err, user) => {
      if (err) {
        return res.status(404).send('no se encontro el usuario');
      }
      if (user) {
        const products = await ProductoSchema.find({
          sucursal: user.sucursal
        }, null, {
          skip: parseInt(offset, 10),
          limit: parseInt(num, 10)
        });
        if (products) {
          return res.status(200).send(products);
        } else {
          return res.status(500).send('error al obtener productos');
        }
      }
    });
  }
}

function getProductoById(req, res) {
  const id = req.params.id;
  ProductoSchema.findOne({
    "_id": id
  }, (err, producto) => {
    if (err) {
      res.status(500).send(`error al obtener el producto: ${err}`);
    }
    res.status(200).send(producto);
  });
}

async function postProducto(req, res) {
  const datos = req.body;
  let producto = new ProductoSchema();

  // buscar si ya existe un producto con el mismo codigo, si existe entonces se aumenta el stock
  // si no existe quiere decir que es un producto nuevo en el sistema.
  const productosPorCodigo = await ProductoSchema.find({
    "codigo": datos.codigo
  });
  if (productosPorCodigo.length > 0) {
    let numeroStock = productosPorCodigo[0].stock;
    ProductoSchema.findOneAndUpdate({
      "codigo": datos.codigo
    }, {
      "stock": numeroStock + 1
    }, {
      new: true
    }, (err, updatedProduct) => {
      if (err) {
        res.status(500).send(`error al actualizar el producto: ${err}`);
      }
      res.status(200).send(updatedProduct);
    });
  } else {
    producto.codigo = datos.codigo;
    producto.nombre = datos.nombre;
    producto.stock = 0;
    producto.costo = datos.costo;
    producto.utilidad = datos.utilidad;
    producto.precio_venta = datos.precio_venta;
    producto.modelo = datos.modelo;
    producto.descripcion = datos.descripcion;
    producto.presentacion = datos.presentacion;
    producto.categorias = datos.categorias;
    producto.imagen = datos.imagen;
    producto.stock_minimo = datos.stock_minimo;
    producto.stock_maximo = datos.stock_maximo;
    producto.sucursal = datos.sucursal;

    producto.save((err, productStore) => {
      if (err) {
        res.status(500).send(`error al guardar el producto: ${err}`);
      }
      res.status(200).send(productStore);
    });
  }
}

function updateHelper(datos, id) {
  ProductoSchema.findOneAndUpdate({
    "_id": id
  }, datos, {
    new: true
  }, (err, updatedProduct) => {
    if (err) {
      res.status(500).send(`error al actualizar el producto: ${err}`);
    }
    res.status(200).send(updatedProduct);
  });
}
async function putProducto(req, res) {
  const id = req.params.id;
  const datosActualizados = req.body;
  const product = await ProductoSchema.findOne({
    _id: id
  });

  ProductoSchema.findOneAndUpdate({
    "_id": id
  }, datosActualizados, {
    new: true
  }, (err, updatedProduct) => {
    if (err) {
      return res.status(500).send(`error al actualizar el producto: ${err}`);
    }
    return res.status(200).send(updatedProduct);
  });
}

async function putProductoStock(req, res) {
  const id = req.params.id;
  const datosActualizados = req.body;
  const product = await ProductoSchema.findOne({
    _id: id
  });
  const minStock = product.stock_minimo;
  const maxStock = product.stock_maximo;

  if (datosActualizados.stock <= maxStock) {
    ProductoSchema.findOneAndUpdate({
      "_id": id
    }, datosActualizados, {
      new: true
    }, (err, updatedProduct) => {
      if (err) {
        return res.status(500).send(`error al actualizar el producto: ${err}`);
      }
      if (datosActualizados.stock >= minStock) {
        return res.status(200).send(updatedProduct);
      } else {
        return res.status(200).send({
          product: updatedProduct,
          type: 'min_stock',
          message: 'Producto insuficiente en almacen'
        });
      }
    });
  } else {
    return res.status(500)
      .send({
        type: 'max_stock',
        message: 'Producto sobrepasa limite en almacen'
      });
  }
}

function deleteProducto(req, res) {
  const id = req.params.id;
  ProductoSchema.findOneAndDelete({
    "_id": id
  }, (err, deletedProduct) => {
    if (err) {
      res.status(500).send(`error al eliminar el producto: ${err}`);
    }
    res.status(200).send(deletedProduct);
  });
}

function findProducto(req, res) {
  let value = req.params.valor;
  // find({ "unusual": {"$elemMatch":{"defindex":363,"_particleEffect":{"$in":[6,19]}  }} })
  ProductoSchema.find({
    $or: [{
        categorias: {
          $elemMatch: {
            nombre: {
              $regex: ".*" + value + ".*",
              $options: "mi"
            }
          }
        }
      },
      {
        nombre: {
          $regex: ".*" + value + ".*",
          $options: "mi"
        }
      },
      {
        codigo: {
          $regex: ".*" + value + ".*",
          $options: "mi"
        }
      },
      {
        modelo: {
          $regex: ".*" + value + ".*",
          $options: "mi"
        }
      },
      // {precio_venta: {$regex: ".*" + value + ".*", $options: "mi"}},
      {
        presentacion: {
          $regex: ".*" + value + ".*",
          $options: "mi"
        }
      }
    ]
  }, (err, ventas) => {
    if (err) {
      return res.status(500).send('error al buscar los porudctos');
    }
    return res.status(200).send(ventas);
  });
}

function findProductoCodigo(req, res) {
  let value = req.params.valor;
  ProductoSchema.find({
    codigo: value
  }, (err, ventas) => {
    if (err) {
      return res.status(500).send('error al buscar el producto');
    }
    return res.status(200).send(ventas);
  });
}

module.exports = {
  getProductosLength,
  getProductos4,
  getProductos,
  getProductoById,
  postProducto,
  putProducto,
  putProductoStock,
  deleteProducto,
  findProducto,
  findProductoCodigo,
  getMoneyFromAllProducts
}

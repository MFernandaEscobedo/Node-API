'use strict';

const CategoriaSchema = require('./../models/CategoriaSchema');
const ProductoSchema = require('./../models/ProductoSchema');
const UsuarioSchema = require('./../models/UsuarioSchema');
const jwt = require('jsonwebtoken');

function getCategorias(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        return res.status(404).send('no se encontro el usuario');
      }
      if(user) {
        CategoriaSchema.find({sucursal: user.sucursal}, (err, categorias) => {
            if(err) {
                res.status(500).send(`error al obtener todas las categorias: ${err}`);
            }
            res.status(200).send(categorias);
        });
      }
    });
  }
}

function getCategoriasLength(req, res) {
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        return res.status(404).send('no se encontro el usuario');
      }
      if(user) {
        CategoriaSchema.find({sucursal: user.sucursal}, (err, categorias) => {
            if(err) {
                res.status(500).send(`error al obtener todas las categorias: ${err}`);
            }
            res.status(200).send({len: categorias.length});
        });
      }
    });
  }
}

function getCategoriasPagination(req, res) {
  let num = req.params.num;
  let offset = req.params.offset;
  let token = req.headers['authorization'].split(' ')[1];
  if(token) {
    let payload = jwt.verify(token, 'clavesecreta');
    UsuarioSchema.findOne({_id: payload.subject}, (err, user) => {
      if(err) {
        return res.status(404).send('no se encontro el usuario');
      }

      if(user) {
        CategoriaSchema.find({sucursal: user.sucursal}, null, {skip: parseInt(offset,10), limit: parseInt(num, 10)}, (err, categorias) => {
            if(err) {
                res.status(500).send(`error al obtener todas las categorias: ${err}`);
            }
            res.status(200).send(categorias);
        });
      }
    });
  }
}

function getCategoriaById(req, res) {
    const id = req.params.id;
    CategoriaSchema.find({id: id}, (err, categoria) => {
        if(err) {
            res.status(500).send(`error al obtener la categoria: ${err}`);
        }
        res.status(200).send(categoria);
    });
}

function postCategoria(req, res) {
    let categoria = new CategoriaSchema();
    categoria.nombre = req.body.nombre;
    categoria.sucursal = req.body.sucursal;

    categoria.save((err, categoryStore) => {
        if(err) {
            res.status(500).send(`error al ingresar nueva categoria: ${err}`);
        }
        res.status(200).send(categoryStore);
    });
}

function putCategoria(req, res) {
    const id = req.params.id;
    let datosActualizados = req.body;
    CategoriaSchema.findOneAndUpdate({"_id": id}, datosActualizados, {new: true}, async (err, updatedCategory) => {
        if(err) {
            res.status(500).send(`error al actualizar la categoria: ${err}`);
        }
        const productByCategory = await ProductoSchema.find({categorias: {$elemMatch: {_id: id}}});
        for(let i = 0; i < productByCategory.length; i++) {
            for(let j = 0; j < productByCategory[i].categorias.length; j++) {
                productByCategory[i].categorias[j].nombre = datosActualizados.nombre;
                const updateCategoryInProduct = await ProductoSchema.findOneAndUpdate({"_id": productByCategory[i]._id}, {categorias: productByCategory[i].categorias[j]})
            }
        }
        res.status(200).send(updatedCategory);
    });
}

async function deleteCategoria(req, res) {
    const id = req.params.id;
    let productosConEsaCategoria = [];
    const productos = await ProductoSchema.find({});
    for(let i = 0; i < productos.length; i++) {
      for(let j = 0; j < productos[i].categorias.length; j++) {
        let categoria = productos[i].categorias[j];
        if(categoria._id === id) {
          productosConEsaCategoria.push(productos[i]);
        }
      }
    }
    if(productosConEsaCategoria.length > 0) {
      return res.status(200).send({hasProducts: true, products: productosConEsaCategoria});
    } else {
      CategoriaSchema.findOneAndDelete({"_id": id}, (err, deletedCategory) => {
          if(err) {
              res.status(500).send(`error al eliminar la categoria: ${err}`);
          }
          res.status(200).send(deletedCategory);
      });
    }
}

function getProductsByCategories(req, res) {
    //api/categorias/1-2-3/productos
    let idCategorias = req.params.idCategorias.split("-");
    for(let i = 0; i < idCategorias.length; i++) {

    }
}

async function findCategory(req, res) {
    let value = req.params.valor;
    CategoriaSchema.find({"nombre": {$regex: ".*" + value + ".*", $options: "mi"}}, (err, categories) => {
        if(err) {
            res.status(500).send('error al buscar categorias');
        }
        res.status(200).send(categories);
    });
}

module.exports = {
    getCategorias,
    getCategoriaById,
    postCategoria,
    putCategoria,
    deleteCategoria,
    getProductsByCategories,
    findCategory,
    getCategoriasPagination,
    getCategoriasLength
}

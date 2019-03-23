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

function getCategoriaById(req, res) {
    const id = req.params.id;
    CategoriaSchema.findById(id, (err, categoria) => {
        if(err) {
            res.status(500).send(`error al obtener la categoria: ${err}`);
        }
        res.status(200).send(categoria);
    });
}

function postCategoria(req, res) {
    console.log('post/categoria');
    let categoria = new CategoriaSchema();
    console.log(req.body);
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

function deleteCategoria(req, res) {
    const id = req.params.id;
    CategoriaSchema.findOneAndDelete({"_id": id}, (err, deletedCategory) => {
        if(err) {
            res.status(500).send(`error al eliminar la categoria: ${err}`);
        }
        res.status(200).send(deletedCategory);
    });
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
    findCategory
}

'use strict';

const CategoriaSchema = require('./../models/CategoriaSchema');
const ProductoSchema = require('./../models/ProductoSchema');

function getCategorias(req, res) {
    CategoriaSchema.find({}, (err, categorias) => {
        if(err) {
            res.status(500).send(`error al obtener las categorias: ${err}`);
        }
        res.status(200).send(categorias);
    });
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
    CategoriaSchema.findOneAndUpdate({"_id": id}, datosActualizados, {new: true}, (err, updatedCategory) => {
        if(err) {
            res.status(500).send(`error al actualizar la categoria: ${err}`);
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

module.exports = {
    getCategorias,
    getCategoriaById,
    postCategoria,
    putCategoria,
    deleteCategoria,
    getProductsByCategories
}
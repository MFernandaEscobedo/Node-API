'use strict';

const CompraSchema = require('./../models/CompraSchema');

function getCompras(req, res) {
    CompraSchema.find({}, (err, compras) => {
        if(err) {
            res.status(500).send(`error al obtener las compras: ${err}`);
        }
        res.status(200).send(compras);
    });
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
    compra.id_proveedor = datos.id_proveedor;
    compra.numero_compra = contadorCompras + 1;
    compra.total = datos.total;
    compra.productos = datos.productos;

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
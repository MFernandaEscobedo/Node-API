'use strict';

const ProductoSchema = require('./../models/ProductoSchema');

function getProductos(req, res) {
    ProductoSchema.find({}, (err, productos) => {
        if (err) {
            res.status(500).send(`error al obtener los productos: ${err}`);
        }
        res.status(200).send(productos);
    });
}

function getProductoById(req, res) {
    const id = req.params.id;
    ProductoSchema.findById(id, (err, producto) => {
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
        console.log(numeroStock);
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
        producto.stock = 1;
        producto.costo = datos.costo;
        producto.utilidad = datos.utilidad;
        producto.precio_venta = datos.costo + datos.utilidad;
        producto.modelo = datos.modelo;
        producto.descripcion = datos.descripcion;
        producto.presentacion = datos.presentacion;
        producto.categorias = datos.categorias;
        producto.imagen = datos.imagen;
        producto.stock_minimo = datos.stock_minimo;
        producto.stock_maximo = datos.stock_maximo;

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
    ProductoSchema.findOneAndUpdate({"_id": id}, datosActualizados, {new: true}, (err, updatedProduct) => {
        if (err) {
            res.status(500).send(`error al actualizar el producto: ${err}`);
        }
        res.status(200).send(updatedProduct);
    });
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

module.exports = {
    getProductos,
    getProductoById,
    postProducto,
    putProducto,
    deleteProducto
}
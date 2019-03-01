'use strict';

const ProveedorSchema = require('./../models/ProveedorSchema');

function getProveedores(req, res) {
    ProveedorSchema.find({}, (err, proveedores) => {
        if(err) {
            res.status(500).send(`error al obtener los proveedores: ${err}`);
        }
        res.status(200).send(proveedores);
    });
}

function getProveedorById(req, res) {
    const id = req.params.id;
    ProveedorSchema.findOne({"_id": id}, (err, proveedor) => {
        if(err) {
            res.status(500).send(`error al obtener al proveedor: ${err}`);
        }
        res.status(200).send(proveedor);
    });
}

function postProveedor(req, res) {
    const datos = req.body;
    let proveedor = new ProveedorSchema();
    proveedor.telefono_empresa = datos.telefono_empresa;
    proveedor.nombre_empresa = datos.nombre_empresa;
    proveedor.email_empresa = datos.email_empresa;
    proveedor.pais = datos.pais;
    proveedor.estado = datos.estado;
    proveedor.ciudad = datos.ciudad;
    proveedor.domicilio = datos.domicilio;
    proveedor.telefono = datos.telefono;
    proveedor.nombre = datos.nombre;
    proveedor.email = datos.email;

    proveedor.save((err, storeProvider) => {
        if(err) {
            res.status(500).send(`error al guardar al proveedor: ${err}`);
        }
        res.status(200).send(storeProvider);
    });
}

function putProveedor(req, res) {
    const id = req.params.id;
    const datosActualizados = req.body;
    ProveedorSchema.findOneAndUpdate({"_id": id}, datosActualizados, {new: true}, (err, updatedProvider) => {
        if(err) {
            res.status(500).send(`error al actualizar al proveedor: ${err}`);
        }
        res.status(200).send(updatedProvider);
    });
}

function deleteProveedor(req, res) {
    const id = req.params.id;
    ProveedorSchema.findOneAndDelete({"_id": id}, (err, deletedProvider) => {
        if(err) {
            res.status(500).send(`error al eliminar al proveedor: ${err}`);
        }
        res.status(200).send(deletedProvider);
    });
}

module.exports = {
    getProveedores,
    getProveedorById,
    postProveedor,
    putProveedor,
    deleteProveedor
}
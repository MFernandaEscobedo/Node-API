'use strict';

const express = require('express');
const api = express.Router();//es un objeto lo que devuelve

// importar los guards de rutas
const guards = require('./guards');

// importamos los controladores
const CategoriaController = require('./../controllers/CategoriaController');
const CompraController = require('./../controllers/CompraController');
const ProductoController = require('./../controllers/ProductoController');
const ProveedorController = require('./../controllers/ProveedorController');
const UsuarioController = require('./../controllers/UsuarioController');
const VentaController = require('./../controllers/VentaController');
const SucursalController = require('./../controllers/SucursalController');
// Categoria

api.get('/categorias', CategoriaController.getCategorias);
api.get('/categoria/:id', CategoriaController.getCategoriaById);
api.post('/categoria', CategoriaController.postCategoria);
api.put('/categoria/:id', CategoriaController.putCategoria);
api.delete('/categoria/:id', CategoriaController.deleteCategoria);
api.get('/categorias/:categoriesId/productos', CategoriaController.getProductsByCategories);
api.get('/buscar-categoria/:valor', CategoriaController.findCategory);

// Compra

api.get('/compras', CompraController.getCompras);
api.get('/compra/:id', CompraController.getCompraById);
api.post('/compra', CompraController.postCompra);
api.put('/compra/:id', CompraController.putCompra);
api.delete('/compra/:id', CompraController.deleteCompra);
api.get('/buscar-proveedor/:valor', ProveedorController.findProvider);

// Producto

api.get('/productos', ProductoController.getProductos);
api.get('/producto/:id', ProductoController.getProductoById);
api.post('/producto', ProductoController.postProducto);
api.put('/producto/:id', ProductoController.putProducto);
api.delete('/producto/:id', ProductoController.deleteProducto);

// Proveedor

api.get('/proveedores', ProveedorController.getProveedores);
api.get('/proveedor/:id', ProveedorController.getProveedorById);
api.post('/proveedor', ProveedorController.postProveedor);
api.put('/proveedor/:id', ProveedorController.putProveedor);
api.delete('/proveedor/:id', ProveedorController.deleteProveedor);
api.get('buscar-proveedor/:valor', ProveedorController.findProvider);

// Usuario
api.get('/usuario/veri-cat', UsuarioController.verifyPermissionCategory);
api.get('/usuarios', UsuarioController.getUsuarios);
api.get('/usuario/:id', UsuarioController.getUsuarioById);
api.post('/usuario', UsuarioController.postUsuario);
api.put('/usuario/:id', UsuarioController.putUsuario);
api.delete('/usuario/:id', UsuarioController.deleteUsuario);
api.post('/usuario/login', UsuarioController.login);

// Venta

api.get('/ventas', VentaController.getVentas);
api.get('/venta/:id', VentaController.getVentaById);
api.post('/venta', VentaController.postVenta);
api.put('/venta/:id', VentaController.putVenta);
api.delete('/venta/:id', VentaController.deleteVenta);

// sucursal

api.get('/sucursales', SucursalController.getSucursales);
api.get('/sucursal/:id', SucursalController.getSucursalById);
api.post('/sucursal', SucursalController.postSucursal);
api.put('/sucursal/:id', SucursalController.putSucursal);
api.delete('/sucursal/:id', SucursalController.deleteSucursal);

api.post('/upload-image', (req, res) => {
    res.send(req.files);
});

module.exports = api;

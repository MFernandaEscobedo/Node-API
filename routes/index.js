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
const LogController = require('./../controllers/LogController');
const NotificacionController = require('./../controllers/NotificacionController');

// log
api.get('/logs', LogController.getLogs);
api.post('/log', LogController.postLog);

// notificaciones
api.get('/notificaciones', NotificacionController.getNotificaciones);
api.post('/notificacion', NotificacionController.postNotificacion);

// Categoria
api.get('/categorias/length', CategoriaController.getCategoriasLength);
api.get('/categorias', CategoriaController.getCategorias);
api.get('/categorias/:num/:offset', CategoriaController.getCategoriasPagination);
api.get('/categoria/:id', CategoriaController.getCategoriaById);
api.post('/categoria', CategoriaController.postCategoria);
api.put('/categoria/:id', CategoriaController.putCategoria);
api.delete('/categoria/:id', CategoriaController.deleteCategoria);
api.get('/categorias/:categoriesId/productos', CategoriaController.getProductsByCategories);
api.get('/buscar-categoria/:valor', CategoriaController.findCategory);

// Compra
api.get('/obtener-dinero-compras', CompraController.getMoneyAllPurchases);
api.get('/buscar-compra/:valor', CompraController.findCompra);
api.get('/buscar-compra/:from/:to', CompraController.findCompraFecha);
api.get('/compras', CompraController.getCompras);
api.get('/compra/:id', CompraController.getCompraById);
api.post('/compra', CompraController.postCompra);
api.put('/compra/:id', CompraController.putCompra);
api.delete('/compra/:id', CompraController.deleteCompra);

// Producto
api.get('/obtener-dinero-productos', ProductoController.getMoneyFromAllProducts);
api.get('/buscar-producto/:valor', ProductoController.findProducto);
api.get('/buscar-producto-codigo/:valor', ProductoController.findProductoCodigo);
api.get('/productos/length', ProductoController.getProductosLength);
api.get('/productos', ProductoController.getProductos);
api.get('/productos/:num/:offset', ProductoController.getProductos4);
api.get('/producto/:id', ProductoController.getProductoById);
api.post('/producto', ProductoController.postProducto);
api.put('/producto/:id', ProductoController.putProducto);
api.put('/producto-stock/:id', ProductoController.putProductoStock);
api.delete('/producto/:id', ProductoController.deleteProducto);

// Proveedor
api.get('/proveedores', ProveedorController.getProveedores);
api.get('/proveedor/:id', ProveedorController.getProveedorById);
api.post('/proveedor', ProveedorController.postProveedor);
api.put('/proveedor/:id', ProveedorController.putProveedor);
api.delete('/proveedor/:id', ProveedorController.deleteProveedor);
api.get('/buscar-proveedor/:valor', ProveedorController.findProvider);

// Usuario
api.get('/usuario/token', UsuarioController.verifyValidToken);
api.get('/usuarios', UsuarioController.getUsuarios);
api.get('/usuario/:id', UsuarioController.getUsuarioById);
api.post('/usuario', UsuarioController.postUsuario);
api.put('/usuario/:id', UsuarioController.putUsuario);
api.delete('/usuario/:id', UsuarioController.deleteUsuario);
api.post('/usuario/login', UsuarioController.login);
api.post('/usuario/verificar', UsuarioController.verifyPermission);
api.post('/usuario/decrypt-pass', UsuarioController.decryptPass);

// Venta
api.get('/obtener-dinero-ventas', VentaController.getMoneyAllSales);
api.get('/buscar-venta/:valor', VentaController.findVenta);
api.get('/buscar-venta/:from/:to', VentaController.findVentaFecha);
api.get('/ventas', VentaController.getVentas);
api.get('/venta/:id', VentaController.getVentaById);
api.post('/venta', VentaController.postVenta);
api.put('/venta/:id', VentaController.putVenta);
api.delete('/venta/:id', VentaController.deleteVenta);

// sucursal
api.get('/buscar-sucursal/:valor', SucursalController.findSucursal);
api.get('/sucursales', SucursalController.getSucursales);
api.get('/sucursal/:id', SucursalController.getSucursalById);
api.post('/sucursal', SucursalController.postSucursal);
api.put('/sucursal/:id', SucursalController.putSucursal);
api.delete('/sucursal/:id', SucursalController.deleteSucursal);;

api.post('/upload-image', (req, res) => {
    res.send(req.files);
});

module.exports = api;

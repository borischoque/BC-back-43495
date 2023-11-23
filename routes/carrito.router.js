const { Router } = require('express');
const CartManager = require('../scr/manejoCarrito.js');
const ProductManager = require('../scr/manejoProductos.js');
const router = Router();

const pathFileCart = './cart.txt';
const pathFileData = './data.txt';

const cartProd = new CartManager(pathFileCart);
const data = new ProductManager(pathFileData);

/***********************************************/
/* Crear un nuevo carrito*/
/***********************************************/
router.post('/', (req, res) => {
    /* Creamos un nuevo carrito */
    cartProd.createProductCart();
    res.send('Nuevo carrito creado...');

})

/***********************************************/
/* Carga de productos en carrito*/
/***********************************************/
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params
    /* Validamos el que producto existe */
    const productSelection = data.getProductById(parseInt(pid))
    /* Si el ID del producto no existe, devolvemos lo siguiente... */
    if (!productSelection) return res.send('El producto no existe')

    /* Validamos que el carrito existe */
    const listCart = cartProd.getProductCartById(parseInt(cid));
    /* Si el ID del producto no existe, devolvemos lo siguiente... */
    if (!listCart) return res.send('El carrito no existe')

    /* Agregamos el producto al carrito */
    cartProd.addProductCart(parseInt(cid), parseInt(pid));
    res.send('Nuevo producto agregado...');

})

/***********************************************/
/* Listado de productos en carrito*/
/***********************************************/
router.get('/:cid', (req, res) => {
    const { cid } = req.params
    /* Lista de productos en carrito */
    const listProd = cartProd.getProductCartById(parseInt(cid));
    /* Si el ID del producto no existe, devolvemos lo siguiente... */
    if (!listProd) return res.send('El carrito no existe')

    /* Si el ID existe, devolvemos los datos del producto */
    res.send(listProd.products)

})


module.exports = router;
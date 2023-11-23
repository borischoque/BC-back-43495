const { Router } = require('express');
const ProductManager = require('../scr/manejoProductos.js');
const { escribirArchivo, leerArchivo } = require('../scr/funcAux.js')
const router = Router();

const pathFile = './data.txt';

const data = new ProductManager(pathFile);

/***********************************************/
/* Devuelve todos los prouctos ó limitados productos*/
/***********************************************/
router.get('/', (req, res) => {

    const { limit } = req.query;
    const allProducts = data.getProducts()

    /* Si no se ingresa el parametro "limit" -> Se devuelve todos los productos */
    if (!limit) return res.send(allProducts)

    /* Si existe el parametro "limit" -> Se devuelve lo siguiente... */
    const limitedProducts = allProducts.slice(0, parseInt(limit));
    res.send(limitedProducts)
})

/***********************************************/
/* Devuelve un producto en particular */
/***********************************************/
router.get('/:idProd', (req, res) => {
    const { idProd } = req.params
    const productSelection = data.getProductById(parseInt(idProd))
    /* Si el ID del producto no existe, devolvemos lo siguiente... */
    if (!productSelection) return res.send('El producto no existe')

    /* Si el ID existe, devolvemos los datos del producto */
    res.send(productSelection)
})

/***********************************************/
/* Agregar un producto */
/***********************************************/
router.post('/', (req, res) => {
    /* Tomamos el nuevo producto agregar del body*/
    let newProduct = req.body;
    /* Agregamos el producto al archivo de datos */
    data.addProduct(newProduct)
        /* Respuesta */
        res.send({
            message: 'Producto Agregado...',
        })

})

/***********************************************/
/* Modificar un producto un producto */
/***********************************************/
router.put('/:idProd', (req, res) => {
    const { idProd } = req.params;
    /* Tomamos el nuevo producto agregar del body*/
    let changedProduct = req.body;
    /* Validacion de que producto a eliminar NO existe */
    const productTest = data.getProductById(parseInt(idProd))
    if (!productTest) return res.send('El producto no existe')
    /* Actualizamos la propiedades del producto */
    data.updateProduct(parseInt(idProd), changedProduct);
    /* Respuesta */
    res.send({
        message: 'Producto Cambiado',
        changedProduct
    })

})

/***********************************************/
/* Eliminar un producto en particular */
/***********************************************/
router.delete('/:idProd', (req, res) => {
    const { idProd } = req.params
    /* Validacion de que producto a eliminar NO existe */
    const productTest = data.getProductById(parseInt(idProd))
    if (!productTest) return res.send('El producto no existe')
    /* Eliminamos el producto (Existe)*/
    data.deleteProduct(parseInt(idProd))
    /* Respuesta de que elimino producto */
    res.send(`-------Se eliminó un producto del archivo------->id: ${idProd}`)
})


module.exports = router;
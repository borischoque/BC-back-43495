/***********************************************/
/***********************************************/
/********* DESAFIO 03 BORIS CHOQUE**************/
/***********************************************/
/***********************************************/

const express = require('express');
const ProductManager = require('./manejoProductos.js');
const app = express();
const PORT = 8081;

const data = new ProductManager('./data.txt');

app.use(express.urlencoded({ extended: true }));

/***********************************************/
/* Devuelve todos los prouctos ó limitados productos*/
/***********************************************/
app.get('/products', (req, res) => {

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
app.get('/products/:idProd', (req, res) => {
    const { idProd } = req.params
    const productSelection = data.getProductById(parseInt(idProd))
    /* Si el ID del producto no existe, devolvemos lo siguiente... */
    if (!productSelection) return res.send('Product does not exist')

    /* Si el ID existe, devolvemos los datos del producto */
    res.send(productSelection)
})


app.listen(PORT, () => {
    console.log(`Server running on Port http://localhost:${PORT}/products`);
})
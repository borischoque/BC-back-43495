/***********************************************/
/***********************************************/
/********* DESAFIO 04 BORIS CHOQUE**************/
/***********************************************/
/***********************************************/

const express = require('express');
const productsRouter = require('../routes/productos.router.js');
const cartRouter = require('../routes/carrito.router.js');
const app = express();
const PORT = 8081;

/***********************************************/
/* Middlewares*/
/***********************************************/
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);

app.use('/api/carts', cartRouter);

app.listen(PORT, () => {
    console.log(`Server running on Port http://localhost:${PORT}/api/products`);
})
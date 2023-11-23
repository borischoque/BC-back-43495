const { escribirArchivo, leerArchivo } = require('./funcAux.js')
const fs = require('fs')

/* Definimos la clase ProductManager */

class CartManager {
    constructor(path) {

        this.path = path;
        /* Acontinuación consideramos si ya existe un archivo */
        if (fs.existsSync(this.path)) {
            console.log('El archivo ya existe');
            try {
                /* Si el archivo ya existe, lo leemos. */
                this.listaCarrito = leerArchivo(this.path)
                
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                /* Si el archivo no existe, lo creo y agrego el contenido del array vacio */
                escribirArchivo(this.path,[])
                // fs.writeFileSync(this.path, JSON.stringify([], null, 2))
                console.log('Se creo un archivo nuevo, ya que no existía');
                /* Como el archivo se creo, definimos el carrito vacio vacia */
                this.listaCarrito = [];
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    /* Método 1 */
    createProductCart = () => {

        console.log('Ingreso a ----> Metodo AGREGAR un Carrito');

        /* Ingreso de producto */
        if (this.listaCarrito.length === 0) {
            /* Si esta condición se cumple, el idCarrtito = 1 ya que es el primer carrito*/
            const auxiliarObject1 = {
                idCarrito: 1,
                products: []
            }
            /*Guardamos en la lista*/
            this.listaCarrito.push(auxiliarObject1)
            /*Guardamos el nuevo producto en el archivo */
            escribirArchivo(this.path,this.listaCarrito)
            console.log('Se guardo el primer carrito en el archivo')

        } else {
            /* Como ya existen productos, se genera un nuevo valor de ID */
            /*Generamos y Guardamos el valor del ID del producto */
            const idNuevo = this.listaCarrito[this.listaCarrito.length - 1].idCarrito + 1;
            /*Guardamos el nuevo prdducto en la lista de productos. */
            this.listaCarrito = [...this.listaCarrito, { idCarrito: idNuevo, products: [] }]
            /*Guardamos el nuevo producto en el archivo */
            escribirArchivo(this.path,this.listaCarrito)
            // fs.writeFileSync(this.path, JSON.stringify(this.listaCarrito, null, 2))
            console.log(`------- Carrito creado ------->idCarrito: ${idNuevo}`)
        }

    }
    /* Método 2 */
    getProductCartById(idBuscado) {
        console.log('Ingreso a ----> Metodo OBTENER productos de un Carrito Especifico');
        /* Validamos que el carrito existe */
        const validation3 = this.listaCarrito.find(producto => producto.idCarrito === idBuscado)

        if (!validation3) {
            console.log(`NO existe el carrito de id: ${idBuscado}`);
            return false;
        }
        return this.listaCarrito.find(({ idCarrito }) => idCarrito === idBuscado)
    }

    /* Método 3 */
    addProductCart(idCart, idProd) {
        console.log('Ingreso a ----> Metodo AGREGAR productos a un Carrito Especifico');
        /* Validación por id de producto */
        const arrayProducts = this.getProductCartById(idCart).products;
        /* Identificamos si el producto ya existe */
        const validationCart = arrayProducts.find(cart => cart.idProducto === idProd)
        if (validationCart) {
            /* Incrementamos la cantidad del producto ya existente */
            validationCart.quantity++;
            /* Guardamos los cambios en los datos */
            this.listaCarrito.find(({ idCarrito }) => idCarrito === idCart).products = arrayProducts;
            /*Guardamos el nuevo producto en el archivo */
            escribirArchivo(this.path, this.listaCarrito)
        } else {
            /* Creamos el nuevo producto para agregar al carrito */
            const auxiliarObject2 = {
                idProducto: idProd,
                quantity: 1
            }
            /* Agregamos el nuevo pedido de producto al carrito */
            const productAdd = [...arrayProducts, auxiliarObject2]
            /* Guardamos los cambios en los datos */
            this.listaCarrito.find(({ idCarrito }) => idCarrito === idCart).products = productAdd;
            /*Guardamos el nuevo producto en el archivo */
            escribirArchivo(this.path, this.listaCarrito)
        }


    }

}

module.exports = CartManager;
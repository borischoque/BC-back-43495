const { escribirArchivo, leerArchivo } = require('./funcAux.js')
const fs = require('fs')

/* Definimos la clase ProductManager */

class ProductManager {
    constructor(path) {

        this.path = path;
        /* Acontinuación consideramos si ya existe un archivo */
        if (fs.existsSync(this.path)) {
            console.log('El archivo ya existe');
            try {
                /* Si el archivo ya existe, lo leemos. */
                this.listaProductos = leerArchivo(this.path)
                
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                /* Si el archivo no existe, lo creo y agrego el contenido del array vacio */
                escribirArchivo(this.path,[])
                // fs.writeFileSync(this.path, JSON.stringify([], null, 2))
                console.log('Se creo un archivo nuevo, ya que no existía');
                /* Como el archivo se creo, definimos la lista de productos vacia */
                this.listaProductos = [];
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    /* Método 1 */
    addProduct = (item) => {

        console.log('Ingreso a ----> Metodo AGREGAR un producto');

        /* Validación por campo vacio */
        if (!item.title || !item.description || !item.price || !item.status || !item.code || !item.stock || !item.category) {
            return false
        }

        /* Validación por campo "code" */
        const validation1 = this.listaProductos.some(producto => producto.code === item.code)

        if (validation1) {
            return false
        }

        /* Ingreso de producto */
        if (this.listaProductos.length === 0) {
            /* Si esta condición se cumple, el ID = 1 ya que es el primer producto */
            item.id = 1;
            /*Guardamos el nuevo prdducto en la lista de productos. */
            this.listaProductos.push(item)
            /*Guardamos el nuevo producto en el archivo */
            escribirArchivo(this.path,this.listaProductos)
            // fs.writeFileSync(this.path, JSON.stringify(this.listaProductos, null, 2))
            console.log('Se guardo el primer producto en el archivo')

        } else {
            /* Como ya existen productos, se genera un nuevo valor de ID */
            /*Generamos y Guardamos el valor del ID del producto */
            const idNuevo = this.listaProductos[this.listaProductos.length - 1].id + 1;
            /*Guardamos el nuevo prdducto en la lista de productos. */
            this.listaProductos = [...this.listaProductos, { ...item, id: idNuevo }]
            /*Guardamos el nuevo producto en el archivo */
            escribirArchivo(this.path,this.listaProductos)
            // fs.writeFileSync(this.path, JSON.stringify(this.listaProductos, null, 2))
            console.log(`-------Se agregó un nuevo producto al archivo------->id: ${idNuevo}`)
        }

    }

    /* Método 2 */
    getProducts = () => {
        console.log('Ingreso a ----> Metodo OBTENER TODOS los productos');
        // console.log(JSON.parse(fs.readFileSync(this.path, 'utf-8')));
        return leerArchivo(this.path)
    }

    /* Método 3 */
    getProductById = (idBuscado) => {
        console.log('Ingreso a ----> Metodo OBTENER un Producto Especifico');
        /* Buscamos el producto */
        const validation3 = this.listaProductos.some(producto => producto.id === idBuscado)

        if (!validation3) {
            return `NO existe el producto de id: ${idBuscado}`;
        }
        // console.log(this.listaProductos.find(({ id }) => id === idBuscado));
        return this.listaProductos.find(({ id }) => id === idBuscado)
    }
    /* Método 4 */
    deleteProduct = (idDelete) => {
        console.log('Ingreso a ----> Metodo ELIMINAR un Producto Especifico');
        /* Generamos un nuevo array auxiliar, excluyento el producto especifico */
        const validation4 = this.listaProductos.filter(prodId => prodId.id !== idDelete)
        /*Guardamos la nueva lista en el archivo */
        escribirArchivo(this.path,validation4)
        // fs.writeFileSync(this.path, JSON.stringify(validation4, null, 2))
        this.listaProductos = validation4;
        console.log(`-------Se eliminó un producto del archivo------->id: ${idDelete}`)

    }
    /* Método 5 */
    updateProduct = (idCambio, obj) => {
        console.log('Ingreso a ----> Metodo CAMBIAR un Producto Especifico');
        /* Encontramos el objeto a modificar según su ID */
        let cambioProducto = this.getProductById(idCambio)
        /* Aplicamos el cambio a las propiedades deseadas, en este caso se indican*/
        cambioProducto.title = obj.title;
        cambioProducto.description = obj.description;
        cambioProducto.price = obj.price;
        cambioProducto.thumbnail = obj.thumbnail;
        /* Eliminamos el objeto del archivo */
        this.deleteProduct(idCambio);
        /* Agregamos el objeto con la propiedad modificada a la lista de productos */
        this.listaProductos.push(cambioProducto)
        /*Guardamos el nuevo listado en el archivo */
        escribirArchivo(this.path,this.listaProductos)
        // fs.writeFileSync(this.path, JSON.stringify(this.listaProductos, null, 2))
        console.log(`-------Se MODIFICO una propiedad de un nuevo producto en el archivo------->id: ${idCambio}`)
    }

}

module.exports = ProductManager;
const fs = require('fs')

/***********************************************/
/* funcion auxiliar para escribir archivos */
/***********************************************/
const escribirArchivo = (ruta, lista) => {
    fs.writeFileSync(ruta, JSON.stringify(lista, null, 2))
}

/***********************************************/
/* funcion auxiliar para leer archivos */
/***********************************************/
const leerArchivo = (ruta) => {
    const lista = fs.readFileSync(ruta, 'utf-8')
    return JSON.parse(lista);
}

/***********************************************/
/* exportamos las funciones auxiliares */
/***********************************************/

module.exports = { escribirArchivo, leerArchivo };
/* Le debo indicar a JS que va a trabajar la 
organización de las imágenes con la librería de 
MUURI. Para conectarme con esta librería, debo 
llamar la clase previamente creada en los estilos, 
en este caso "grid"  */

/* De igual manera, el establecimiento de los 
valores de las variables y argumentos están indicados 
en la web de Muuri. Es necesario consultar la documentación
para poder manipular los elementos de la librería*/
const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

/* Este es el cógigo que se va a ejecutar cuando la ventana
del index cargue completamente */
/* Esta función es el complemento del estilo css 
de .grid.imagenes-cargadas */
window.addEventListener('load', () => {
    /* Este refresh se usa para el momento de cambiar el tamaño 
    de la pantalla (achicarla) porque Muuri necesita recalcular
    la distribución y el tamaño de los elementos de acuerdo 
    al nuevo tamaño */ 
    grid.refreshItems().layout();
    /* Aquí se conecta con las imagenes-cargadas que están en los
    estilos CSS */
    document.getElementById('grid').classList.add('imagenes-cargadas');
});








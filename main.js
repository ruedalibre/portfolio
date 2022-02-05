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

    /* 
    EN ESTA SECCIÓN VA EL CÓDIGO PARA REALIZAR EL FILTRADO 
    A TRAVÉS DEL MENÚ DE CATEGORÍAS
    */
    /* Se crea una variable para guardar todos los enlaces y poder 
    acceder a cada una de las categorías al realizar las búsquedas:*/
    const enlaces = document.querySelectorAll("#categorias a");
    enlaces.forEach((elemento) => {
        /* Este código se encarga de quitarle el estado activo 
        a la categoría por defecto (All) y se lo traspasa a la 
        categoría sobre la cual el usuario haga click*/
        elemento.addEventListener('click', (evento) => {
            /* Es necesario añadir esta línea para evitar el 
            comportamiento por defecto del navegador */ 
            evento.preventDefault();
            /* Esta línea desactiva la categoría activa (le quita la 
                negrita al texto) después de que se haga click sobre 
                otra categoría*/
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            /* Esta línea hace que, al dar click sobre la nueva 
             categoría, esta quede activa automáticamente */
            evento.target.classList.add('activo');
            
            /* Esta línea se encarga del filtrado de las búsquedas. 
            Accede al texto del elemento que está siendo clickeado y 
            guarda la categoría clickeada en una variable "categoria" */
            /* El lower case es necesario para evitar la falta de coincidencia 
            entre el título de la categoría y el término usado en la búsqueda */
            const categoria = evento.target.innerHTML.toLowerCase();
            
            /* Esta línea es la que hace el filtrado. 
            La función filter accede al valor de la variable que guarda 
            la categoría sobre la cual el usuario hizo click */
            /* Lo primeo que hace es verificar si la categoría es la que 
            aparece por defecto al abrir el index (all) o si es otra diferente*/
            /* Si la categoría es "all", entonces va a mostrar todas las imagenes.
            Si es otra, va a filtrar las imagenes de acuerdo a las etiquetas
            que tenga la categoría*/
            /* Para esto se usa un operador condicional if ternario */
            categoria === 'all' ? grid.filter(`[data-categoria]`) : 
                grid.filter(`[data-categoria="${categoria}"]`);

        });
    }); 

    /* 
    CÓDIGO PARA REALIZAR EL FILTRADO A TRAVÉS DE 
    LA BARRA DE BÚSQUEDA
    */

    /* Lo primero que debo hacer es acceder a la barra de 
    búsqueda y guardar en una variable el término de búsqueda 
    ingresado por el usuario*/
    document.querySelector('#barra-busqueda')
        .addEventListener('input', (evento) => {
            const busqueda = evento.target.value;
            /* Esta función se encarga de revisar la coincidencia 
            entre los caracteres ingresados por el usuario y las 
            etiquetas existentes en cada categoría. Este proceso 
            lo realiza en tiempo real, lo cual hace que las imagenes
            vayan apareciendo automáticamente a medida que el 
            usuario está escribiendo*/
            grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
        });

    /* 
    SECCIÓN PARA AGREGAR UN EVENT LISTENER PARA ABRIR LAS IMAGENES
    AL HACER CLICK SOBRE ELLAS JUNTO CON SU RESPECTIVA DESCRIPCION
    */
    const overlay = document.getElementById('overlay');
    /* Para mostrar las imagenes overlay al presionar cualquiera 
    de las imagenes del index. Para esto debo acceder a todaas las 
    imagenes que están dentro de la clase item y que a su vez 
    están dentro de la clase grid */
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        /* Esta línea es la que ejecuta la acción cuando el usuario hace
        click sobre la imagen */
        elemento.addEventListener('click', () => {
            /* Debo primero obtener la ruta de cada elemento (imagen), y 
            esta ruta se encuentra en la fuente (source) de la imagen*/
            const ruta = elemento.getAttribute('src');
            /* Ahora quiero acceder a la descripción de la imagen. Sin embargo, 
            dado que la descripción está por fuera de la imagen, debo 
            indicar la ruta adecuada, accediendo al padre del texto de la 
            descripción. Es como devolver el hilo y luego entrar a buscar 
            el dato de la descripcion */
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            overlay.classList.add('activo');
            /* Para no quemar las imagenes sino que se muestre en 
            overlay la imagen seleccionada, hay que indicarle la 
            ruta previamente guardada en dicha variable*/
            document.querySelector('#overlay img').src = ruta;
            // Hago lo mismo para obtener la descripción
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });
    /* 
    AGREGAR ACCION EVENT LISTENER AL BOTÓN DE 
    CERRAR IMAGEN EN OVERLAY
    */
    /* Al acceder al botón y sus clases desactivo el estado activo para 
    que la imagen se cierre*/
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    /* 
    AGREGAR ACCION EVENT LISTENER PARA CERRAR IMAGEN 
    AL HACER CLICK POR FUERA DEL OVERLAY
    */
   overlay.addEventListener('click', (evento) => {
        // overlay.classList.remove('activo');
        /* Crea un condicional para que, al tener abierta la imagen del 
        overlay, revise si la parte donde está haciendo click está por 
        fuera de la imagen y la descripción, y en este caso la imagen se 
        cerrará. Pero si el usuario hace click sobre la imagen o la 
        descripción, la imagen overlay no se cerrará */
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
   });

});








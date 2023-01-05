document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});

/* Funcion que manda llamar a otras funciones */
function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();

}

//Navegacion fija y variable segun scroll
/* Esta funcion activa la clase fijo o la desactiva en funcion de la posicion del elemento heder
en la pantalla, actua sobre el final del elemento porque asi se lo hemos indicado con botom */

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        

        if(sobreFestival.getBoundingClientRect().bottom <= 0 ){//getBoundClientRect funcion que devuelve la posicion del elemento segun vamos haciendo scroll
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
            //aplicando y quitnado estilos hacemos que no se note tanto el cambio caundo cambia a posicion fija el nav
        }
    
        })
}


// Smooth Scroll con js vanilla

function scrollNav() {
    const enlaces = document.querySelectorAll(".navegacion-principal a");//seleccionar todos los enlaces
    enlaces.forEach((enlace) => {//iterar los enlaces para anhadir eventos
        enlace.addEventListener("click", function (e) {
            e.preventDefault();//quitar el comportamiento por defecto

            const seccionTarget = e.target.attributes.href.value;//seleccionar el valor del href del enlace
            const seccion = document.querySelector(seccionTarget);//seleccionar la seccion

            seccion.scrollIntoView({ behavior: "smooth" });
            //scrollView funcion que puede cambiar el comportamiento del scroll, se le pasa un objeto con la configuracion
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement("picture");

        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
        <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
        <img width="200" heigth="300" src="build/img/${i}.jpg" alt="Imagen galeria" />`;

        //esta forma de llamar a la funcion es un callback de esta manera podemos rescatar
        // la variable i ante el evento de click
        imagen.onclick = function () {
            mostrarImagen(i);
        };

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement("picture");

    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif" />
        <source srcset="build/img/grande/${id}.webp" type="image/webp" />
        <img width="200" heigth="300" src="build/img/${id}.jpg" alt="Imagen galeria" />`;

    //crea el overlay con la imagen
    const overlay = document.createElement("div");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");

    // cerrar el overlay volviendo a pinchar en cualquier parte
    overlay.onclick = function () {
        overlay.remove();
        body.classList.remove("fijar-body");
    };

    //Boton para cerrar la ventana modal
    const cerrarModal = document.createElement("P");
    cerrarModal.textContent = "X";
    cerrarModal.classList.add("btn-cerrar");

    // funcion para cerrar pulsando en la x(no es necesaria si dejamos la primera funcion que cierra pinchando en cualquier parte)
    cerrarModal.onclick = function () {
        overlay.remove();
        body.classList.remove("fijar-body");
    };

    overlay.appendChild(cerrarModal);

    //Anhadir a html
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");
}

document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});


function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();

}



function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        

        if(sobreFestival.getBoundingClientRect().bottom <= 0 ){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
            
        }
    
        })
}




function scrollNav() {
    const enlaces = document.querySelectorAll(".navegacion-principal a");
    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", function (e) {
            e.preventDefault();

            const seccionTarget = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionTarget);

            seccion.scrollIntoView({ behavior: "smooth" });
            
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

    
    const overlay = document.createElement("div");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");

    
    overlay.onclick = function () {
        overlay.remove();
        body.classList.remove("fijar-body");
    };

    
    const cerrarModal = document.createElement("P");
    cerrarModal.textContent = "X";
    cerrarModal.classList.add("btn-cerrar");

    
    cerrarModal.onclick = function () {
        overlay.remove();
        body.classList.remove("fijar-body");
    };

    overlay.appendChild(cerrarModal);

   
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");
}

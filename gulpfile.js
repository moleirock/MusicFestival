const { src, dest, watch, parallel } = require("gulp");
//extraer la funcionalidad de gulp en este archivo src: funcion que identifica un archivo, dest:permite almacenar en una carpeta de destino.
// watch es una funcion que trae gulp para el refresco.

//CSS
const sass = require("gulp-sass")(require("sass")); // npm i gulp-sass --save-dev
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer"); //anhadir prefijos para que las paginas tengan mejor soporte
const cssnano = require("cssnano"); //minificar codigo css
const postcss = require("gulp-postcss"); //comprimir el codigo
const sourcemaps = require("gulp-sourcemaps");

// Necesitamos del framework gulp-sass para poder importar la funcion de sass que tenemos.

//Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");

const webp = require("gulp-webp");
const avif = require("gulp-avif");

//JavaScript

const terser = require('gulp-terser-js'); //minificar codigo js



function css(done) {
    src("src/scss/**/*.scss") // Identificar archivo de SASS
        .pipe(sourcemaps.init())//inicia el mapeo de archivos, los resultados solo son visibles en el navegador
        .pipe(plumber()) //dependencia para que no detenga la ejecucion del workflow cuando haya errores
        .pipe(sass()) //Compilar el archivo
        .pipe(postcss([autoprefixer(), cssnano()])) //Mejorar la performance(esto se hace al final del proyecto)
        .pipe(sourcemaps.write('.'))//aqui elegimos donde se guarda el sourcemaps, al poner un punto se guarda en el mismo sitio que la hoja de estilos
        .pipe(dest("build/css")); //Almacenarla en le disco duro

    // pipe es de la API de gulp y lo que hace es esperar a que termine la funcion anterior para realizar lo que le digamos

    done(); //callback que avisa a gulp cuando termina la funcion
}

function imagenes(done) {
    // Los atributos del objeto opciones deben llevar el nombre que se marca en la documentacion
    const opciones = {
        optimizationLevel: 3,
    };

    src("src/img/**/*.{png,jpg}")
        .pipe(cache(imagemin(opciones)))
        .pipe(dest("build/img"));

    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50,
    };

    src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));

    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50,
    };

    src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));

    done();
}

function javascript(done) {
    src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())//minificar codigo js
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/js"));

    done();
}

function dev(done) {
    //esta funcion manda llamar a css pero con un watch, tenemos que indicarle que archivo debe observar y la funcion de que debe realizar
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}

/* Al usar la sintaxis de **\*.scss estamos haciendo que de forma recursiva se observen por los cambios de cualquier archivo que tenga extension scss */

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);

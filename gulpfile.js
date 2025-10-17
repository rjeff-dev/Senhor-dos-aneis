const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const imagemin = require("gulp-imagemin");
const cssUrlAdjuster  = require('gulp-css-url-adjuster');

function styles(){
    return gulp.src('src/styles/style.scss') // Garante que só o arquivo principal seja compilado
        .pipe(sass().on('error', sass.logError)) 
        .pipe(cssUrlAdjuster({
            replace:['../images,', '../images'] //Manem o caminhp relativo, no src/stylepara image, depois vai no dist, css para imagem
        }))                                        
        .pipe(cleanCss()) 
        // CORREÇÃO FINAL: Salva diretamente em 'dist'
        .pipe(gulp.dest('./dist')); 
}

function html() {
    return gulp
        .src('src/*.html') // pega os HTMLs da pasta src
        .pipe(htmlmin({ collapseWhitespace: true })) // remove espaços e quebras
        .pipe(gulp.dest('dist')); // envia pro dist/
}


function fonts() {
    // ESTA É A MELHOR CORREÇÃO. O **/* encontra arquivos em QUALQUER subpasta.
    return gulp.src('./src/fonts/**/*.{woff,woff2,ttf,TTF,otf,OTF}') 
        .pipe(gulp.dest('./dist/fonts'));
}

function images(){
    // NOVO PADRÃO: './src/images/**/*.{jpg,png,gif,svg}'
    // Isso garante que você pegue QUALQUER arquivo com essas extensões em todas as subpastas.
    // É o padrão mais seguro para evitar pastas vazias.

    return gulp.src('./src/images/**/*.{jpg,jpeg,png,gif,svg}', { encoding: false }) 
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

exports.default = gulp.parallel(styles, images, html, fonts);

exports.watch = function(){
    gulp.watch('./src/styles/**/*.scss', gulp.parallel(styles));
}
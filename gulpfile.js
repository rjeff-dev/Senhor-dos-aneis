const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCss = require('gulp-clean-css')
const imagemin = require("gulp-imagemin")
// const watch = require('gulp-watch');

function styles(){
    return gulp.src('src/styles/style.scss') // Garante que só o arquivo principal seja compilado
        .pipe(sass().on('error', sass.logError)) 
        .pipe(cleanCss()) 
        // CORREÇÃO FINAL: Salva diretamente em 'dist'
        .pipe(gulp.dest('./dist')); 
}

function images(){
    // NOVO PADRÃO: './src/images/**/*.{jpg,png,gif,svg}'
    // Isso garante que você pegue QUALQUER arquivo com essas extensões em todas as subpastas.
    // É o padrão mais seguro para evitar pastas vazias.

    return gulp.src('./src/images/**/*.{jpg,jpeg,png,gif,svg}', { encoding: false }) 
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

exports.default = gulp.parallel(styles, images);

exports.watch = function(){
    gulp.watch('./src/styles/**/*.scss', gulp.parallel(styles));
}
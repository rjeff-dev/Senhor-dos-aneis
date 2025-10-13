const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const watch = require('gulp-watch');

function styles(){
    return gulp.src('src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist/styles'));
}

exports.default = gulp.parallel(styles);
exports.watch = function(){
    gulp.watch('./src/styles/**/*.scss', gulp.parallel(styles));
}
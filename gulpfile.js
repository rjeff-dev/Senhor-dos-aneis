const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function styles(){
    return gulp.src('src/styles/style.scss')
        .pipe(sass({ outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist/styles'));
}

exports.default = gulp.parallel(styles);
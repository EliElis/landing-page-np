const gulp = require('gulp');

module.exports = function html() {
    return gulp.src('src/*.{pdf,html}')
        .pipe(gulp.dest('build/'))
}
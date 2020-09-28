const gulp = require('gulp')
module.exports = function videos() {
    return gulp.src('src/video/*')
        .pipe(gulp.dest('build/video'))
}
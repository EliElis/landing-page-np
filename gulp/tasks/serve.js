const gulp = require('gulp');
const images = require('./images');
const style = require('./style');
const script = require('./script');
const browserSync  = require('browser-sync').create();
const html = require('./html');

function readyReload(cb) {
    browserSync.reload();
    cb()
}

module.exports = function serve(cb) {
    browserSync .init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch('src/img/*.{gif,png,jpg,svg,webp}', gulp.series(images, readyReload));
    gulp.watch('src/*.{html,pdf}', gulp.series(html, readyReload));
    gulp.watch('src/scss/**/*.scss', gulp.series(style, cb => gulp.src('build/css').pipe(browserSync.stream()).on('end', cb)));
    gulp.watch('src/js/**/*.js', gulp.series(script, readyReload));


    return cb()
};
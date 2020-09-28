const gulp = require('gulp');
const serve = require('./gulp/tasks/serve');
const style = require('./gulp/tasks/style');
const script = require('./gulp/tasks/script');
const clean = require('./gulp/tasks/clean');
const images = require('./gulp/tasks/images');
const html = require('./gulp/tasks/html');
const fonts = require('./gulp/tasks/fonts');
const videos = require('./gulp/tasks/otherFiles');

function setMode(isProduction = false) {
    return cb => {
        process.env.NODE_ENV = isProduction ? 'production' : 'development';
        cb()
    }
}

const dev = gulp.parallel(html, style, script, images, fonts, videos);

const build = gulp.series(clean, dev);

module.exports.start = gulp.series(setMode(), build, serve);
module.exports.build = gulp.series(setMode(true), build);

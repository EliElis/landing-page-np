const gulp = require('gulp');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');


module.exports = function script() {
    return gulp.src('src/js/main.js')
        .pipe(plumber())
        .pipe(webpack({
            mode: process.env.NODE_ENV,
            output: {
                filename: '[name].min.js',
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            },
        }))
        .pipe(gulp.dest('build/js'))
}
var gulp = require('gulp');
var browsersync = require("browser-sync").create();
var sass = require('gulp-sass');
// var imagemin = require('gulp-imagemin');
// var imageminJpg = require('imagemin-jpeg-recompress');
// var imageminPng = require('imagemin-pngquant');
// var imageminGif = require('imagemin-gifsicle');
// var svgmin = require('gulp-svgmin');
var cleanCSS = require("gulp-clean-css");
var rename   = require("gulp-rename");
var uglify = require("gulp-uglify");

gulp.task('build-server', function (done) {
    browsersync.init({
        server: {
            baseDir: "../"
        }
    });
    done();
    console.log('Server was launched');
});

// 監視ファイル
gulp.task('watch-files', function(done) {
    gulp.watch("../*/*/html/*.html", gulp.task('browser-reload'));
    gulp.watch("../*/*/*/scss/*.css", gulp.series('browser-reload', 'css-minify'));
    gulp.watch("../*/*/js/*.js", gulp.series('browser-reload', 'js-minify'));
    gulp.watch("../*/*/scss/*.scss", gulp.series('sass-compile'));
    gulp.watch("../*/*.scss", gulp.series('sass-compile'));
    done();
    console.log(('gulp watch started'));
});

// ブラウザのリロード
gulp.task('browser-reload', function (done){
    browsersync.reload();
    done();
    console.log('Browser reload completed');
});

// scss用のコンパイル作業
gulp.task('sass-compile', function(done){
    gulp.src('../*/*/scss/*.scss') // scssがあるパスを指定
        .pipe(sass().on('error', sass.logError)) // scssコンパイル実行
        .pipe(gulp.dest('../css')); // 書き出し先
    done();
});


// cssの圧縮&rename
gulp.task('css-minify', function(done) {
    gulp.src('../*/*/*/scss/*.css')
        .pipe(cleanCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('../dest/'));
    done();
});

// jsの圧縮&rename
gulp.task('js-minify', function(done) {
    // gulp.src('../*/*/js/*.js')
    //     .pipe(uglify())
    //     .pipe(rename({
    //         extname: '.min.js'
    //     }))
    //     .pipe(gulp.dest('../dest/js/'));
    done();
});

gulp.task('default', gulp.series('build-server', 'watch-files', function(done){
    done();
    console.log('Default all task done!');
}));
    


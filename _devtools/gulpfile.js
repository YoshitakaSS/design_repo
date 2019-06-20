var gulp = require('gulp');
var browsersync = require("browser-sync").create();
var sass = require('gulp-sass');

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
    gulp.watch("../*/*/*/scss/*.css", gulp.task('browser-reload'));
    gulp.watch("../*/*/js/*.js", gulp.task('browser-reload'));
    gulp.watch("../*/*/scss/*.scss",gulp.series('sass-compile'));
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
    console.log('sass compile worked');
    gulp.src('../*/*/scss/*.scss') // scssがあるパスを指定
        .pipe(sass().on('error', sass.logError)) // scssコンパイル実行
        .pipe(gulp.dest('../css')); // 書き出し先
    done();
});

gulp.task('default', gulp.series('build-server', 'watch-files', 'sass-compile', function(done){
    done();
    console.log('Default all task done!');
}));
    


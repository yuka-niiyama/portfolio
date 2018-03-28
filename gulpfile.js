const gulp = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');
const webserver = require('gulp-webserver');
const livereload = require('gulp-livereload');

gulp.task('clean', del.bind(null, ['docs']));

gulp.task('pug', function () {
  return gulp.src(['./pug/**/*.pug', '!./pug/**/_*.pug'])
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('./docs'))
    .pipe(livereload());
});

gulp.task('sass', function () {
  return gulp.src(['./sass/**/*.sass', '!./sass/**/_*.sass'])
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./docs/css'))
    .pipe(livereload());
});

gulp.task('copy', function() {
  return gulp.src('./image/**/*')
    .pipe(gulp.dest('./docs/image'));
});

gulp.task('build', function() {
  runSequence('clean', ['pug', 'sass', 'copy']);
});

gulp.task('watch', ['build'], function () {
  livereload.listen();
  gulp.watch('./pug/**/*.pug', ['pug']);
  gulp.watch('./sass/**/*.sass', ['sass']);
});

gulp.task('webserver', function () {
  gulp.src('docs') // 公開したい静的ファイルを配置したディレクトリを指定する
    .pipe(webserver({
      host: 'localhost',
      source: '/docs',
      port: 8000,
      livereload: true
    }));
});

gulp.task('default', ['webserver', 'watch']);

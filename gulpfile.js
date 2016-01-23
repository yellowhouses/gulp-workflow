var gulp = require("gulp"),
    browserSync = require('browser-sync').create(),
    concat = require("gulp-concat"),
    compass = require("gulp-compass"),
    autoprefixer = require('gulp-autoprefixer'),
    replace =  require('gulp-replace'),
    tpl = require('gulp-template'),
    contentIncluder = require('gulp-content-includer'),
    processhtml = require('gulp-processhtml'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    rename = require('gulp-rename'),
    clean = require("gulp-clean"),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    filter = require('gulp-filter');

// compile less-css and autoprefixer
gulp.task('css', function() {
  gulp.src('./src/sass/*.scss')
  .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
  .pipe(compass({
    css: 'src/css',
    sass: 'src/sass',
    image: 'src/img',
    comments: false,
    style: 'expanded',
  }))
  .on('error', function(error) {
      // Would like to catch the error here 
      console.log(error);
      this.emit('end');
  })
  .pipe(gulp.dest('./dist/css/'));
});

// concat js and move 3rd
gulp.task('js', function (){
    var jsFilter = filter('src/scripts/*.js', {restore: true});
    return gulp.src('src/scripts/**/*.js')
        // 依据Filter创建文件子集，后restore
        .pipe(jsFilter)
        .pipe(concat('bisc.js'))
        .pipe(jsFilter.restore)
        .pipe(gulp.dest('dist/scripts/'));
});

//html
gulp.task('html',['css','js'],function() {
  return gulp.src("src/html/*.html")
      // 引入html的include组件：
      // <!--include "../?.html"-->
      .pipe(contentIncluder({
          includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
      }))
      // 将html文件中的<%= root %>替换为../
      .pipe(tpl({
          root:'../'
      }))
      //html build
      .pipe(processhtml({}))
      //html mini
      //.pipe(minifyHTML(opts))
      .pipe(gulp.dest('dist/html/'));
});

gulp.task('images', function() {
  return gulp.src(['src/images/**/*'])
    .pipe(imagemin({
            optimizationLevel: 4,
            progressive: true,
            interlaced: true,
            multipass: true
        }))
    .pipe(gulp.dest('dist/images/'))
    .pipe(notify({message: 'Images task completed'}));
});

// clean
gulp.task('clean', function() {
  return gulp.src(['dist/'], {read: false})
      .pipe(clean());
});

// browser-sync createServer
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

// reload
gulp.task('reload',function(){
  browserSync.reload();
});

// watch
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.sass', ['css','reload']);
    gulp.watch('src/scripts/**/*.js', ['js','reload']);
    gulp.watch('src/html/**/*.html',['html','reload']);
    gulp.watch('src/images/**/*',['images','reload']);
});

//build
gulp.task('build',['css','js','html','images']);
gulp.task('default', ['browserSync','build','watch']);
gulp.task('server',['browserSync','watch']);
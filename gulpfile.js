var gulp = require("gulp"),
    browserSync = require('browser-sync').create(),
    concat = require("gulp-concat"),
    compass = require("gulp-compass"),
    spritesmith = require('gulp.spritesmith'),
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
    merge = require('merge-stream'),
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
  .pipe(gulp.dest('dist/css/'));
});

// create sprite
gulp.task('sprite', function () {
    var spriteData = gulp.src('src/img/icon/*.png').pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            cssFormat: 'scss',
            padding: 5,
            cssTemplate: 'scss.template.mustache'
        }));
    var imgStream = spriteData.img.pipe(gulp.dest('src/img/'));
    var cssStream = spriteData.css.pipe(gulp.dest('src/sass/sprite/'));

    return merge(imgStream, cssStream);
});

// concat js and move 3rd
gulp.task('js', function (){
    // var jsFilter = filter('src/scripts/*.js', {restore: true});
    var concatJs =  gulp.src('src/scripts/*.js')
        .pipe(concat('bisc.js'))
        .pipe(gulp.dest('dist/scripts/'));
    var move3rd = gulp.src('src/scripts/3rd/**').pipe(gulp.dest('dist/scripts/3rd/'));

    return merge(concatJs, move3rd);
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
  return gulp.src('src/img/*')
    .pipe(imagemin({
            optimizationLevel: 4,
            progressive: true,
            interlaced: true,
            multipass: true
        }))
    .pipe(gulp.dest('dist/img/'));
    //.pipe(notify({message: 'Images task completed'}));
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
            baseDir: "./dist/html/"
        }
    });
});

// reload
gulp.task('reload',function(){
  browserSync.reload();
});

// watch
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sprite', 'css', 'reload']);
    gulp.watch('src/scripts/**/*.js', ['js','reload']);
    gulp.watch('src/html/**/*.html',['html','reload']);
    gulp.watch('src/images/**/*',['images','reload']);
});

//build
gulp.task('build',['clean', 'sprite', 'css', 'js', 'html', 'images']);
gulp.task('default', ['browserSync','build','watch']);
gulp.task('server',['browserSync','watch']);
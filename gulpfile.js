var gulp = require("gulp"),
    //js:校验、压缩、合并
    uglify = require("gulp-uglify"),
    jshint = require("gulp-jshint"),
    concat = require("gulp-concat"),
    //css:sass、压缩、自动前缀
    compass = require("gulp-compass"),
    minifyCSS = require("gulp-minify-css"),
    autoprefixer = require('gulp-autoprefixer'),
    //html：压缩、替换、模板、html片段
    minifyHTML = require('gulp-minify-html'),
    replace =  require('gulp-replace');
    tpl = require('gulp-template')
    contentIncluder = require('gulp-content-includer'),
    processhtml = require('gulp-processhtml'),
    //images:图片压缩、发布缓存
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    //livereload
    connect = require('gulp-connect'),
    //版本号控制
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),

    //其它
    rename = require('gulp-rename'),
    clean = require("gulp-clean"),
    notify = require('gulp-notify'),
    filter = require('gulp-filter');

gulp.task('connect',function(){
    connect.server({
        root:'dist',
        port:3001,
        livereload:true
    })
});

/*
browser-sync,用于响应式调试
*/
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/html/"
        }
    });
});


/**
 * compass
 */
gulp.task('css', function() {
  gulp.src('./src/sass/*.scss')
  .pipe(compass({
    css: 'src/css',
    sass: 'src/sass',
    image: 'src/images',
    font: 'src/fonts',
    javascript: 'src/scripts',
    comments: false,
    style: 'expanded',
  }))
  .on('error', function(err) {})
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest('./src/css/'))
  .pipe(minifyCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./src/css/'))
 // .pipe(rev())
 // .pipe(gulp.dest('./dist/css/'))
 // .pipe(rev.manifest({
 //       base:'dist',
 //       merge:true
 // }))
  .pipe(gulp.dest('./dist/css/'))
  .pipe(connect.reload());
});

//清除
gulp.task('clean', function() {
  return gulp.src(['dist/'], {read: false})
      .pipe(clean());
});

// 语法检查
gulp.task('jshint', function () {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js', function (){
   // return gulp.src(['src/3rd/jQuery/dist/jquery.min.js','src/scripts/common.js','src/scripts/app.js'])
    return gulp.src([
        'src/scripts/slider.js',
        // 在此添加需要的JS组件
    ])
        .pipe(concat('bisc.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/scripts'))
       // .pipe(rev())
       // .pipe(rev.manifest({
       //     base:'dist',
       //     merge:true
       // }))
       // .pipe(gulp.dest('dist/scripts'))
        .pipe(connect.reload());
});

//html
gulp.task('html',['css','js'],function() {
 // var opts = {
 //   conditionals: true,
 //   spare:true
 // };
 //  var manifest = gulp.src('dist/manifest.json');
  var jsFilter = filter('**/*.js');

  return gulp.src("src/html/*.html")
      // 引入html的include组件：<!--include "../?.html"-->
      .pipe(contentIncluder({
          includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
      }))
      // 将html文件中的<%= root %>替换为../
      .pipe(tpl({
          root:'../'
      }))
      //rev
      //.pipe(revReplace({manifest:manifest}))
//      //js
      .pipe(jsFilter)
      .pipe(uglify())
      .pipe(jsFilter.restore())
      //html build
      .pipe(processhtml({}))
      //html mini
      //.pipe(minifyHTML(opts))
      .pipe(gulp.dest('dist/html/'))
      .pipe(connect.reload());
});

//图片压缩
gulp.task('images', function() {  
  return gulp.src(['src/images/**/*'])
    .pipe(gulp.dest('dist/images/'))
    .pipe(connect.reload());
    //.pipe(notify({ message: 'Images task complete' }));
});


//watch
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['css']);
    gulp.watch('src/scripts/**/*.js', ['jshint','js']);
    gulp.watch('src/html/**/*.html',['html']);
    gulp.watch('src/images/**/*',['images']);
});

//build
gulp.task('build',['css','js','html','images']);
gulp.task('default', ['clean','connect','build','watch']);
gulp.task('server',['connect','watch']);
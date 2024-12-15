
const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
const clean = require("gulp-clean");
const options = require("./config");

const fileinclude = require('gulp-file-include');
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require('gulp-sourcemaps');
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const cssbeautify = require("gulp-cssbeautify");
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();

const info = require("./package.json"); 
const clientDistPath = "zip_version/" + info.title + "_v" + info.version + "/" + info.name;

function previewReload(done) {  
  browserSync.reload();
  done(); 
}

/* ===============================
        Dist Version 
=============================== */

function distHTML() {
  return src('./src/html/pages/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('./dist/'))
}

function distStyle() {
  return gulp.src('./src/assets/sass/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sass())
    .pipe(concat({ path: "style.css" }))
    // .pipe(cleanCSS({
    //   inline: ['none']
    // }))
    // .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('./dist/assets/css'))
};

function distVendorStyle() {
  return src('./src/assets/css/lib/*.css')
    // .pipe(concat("plugins.css"))
    // .pipe(cleanCSS())
    // .pipe(rename({ suffix: ".min" }))
    .pipe(dest('./dist/assets/css/lib/'))
}

function distCss() {
  return src('./src/assets/css/*.css')
    .pipe(dest('./dist/assets/css/'))
}

function distFonts() {
  return src('./src/assets/fonts/**/*.*')
    .pipe(dest('./dist/assets/fonts/'))
}

function distFontAwesome() {
  return src('./src/assets/webfonts/**/*.*')
    .pipe(dest('./dist/assets/webfonts/'))
}

function distImages() {
  return src('./src/assets/images/**/*.*')
    .pipe(dest('./dist/assets/images/'))
}

function distScript() {
  return src('./src/assets/js/app.js')
    // .pipe(concat("app.js"))
    // .pipe(uglify())
    // .pipe(rename({ suffix: ".min" }))
    .pipe(dest('./dist/assets/js/'))
}

function distVendorScript() {
  return src('./src/assets/js/lib/*.*')
    // .pipe(concat("plugins.js"))
    // .pipe(uglify())
    // .pipe(rename({ suffix: ".min" }))
    .pipe(dest('./dist/assets/js/lib'))
}

function distJs() {
  return src([
    './src/assets/js/*.js',
    '!./src/assets/js/app.js'
  ])
    .pipe(dest('./dist/assets/js/'))
}

function watchFiles(){
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });

  watch(
    ['./src/**/*.{html,php}'],
    series(distHTML, distStyle, previewReload)
  );

  watch('./src/assets/images/**/*.*', series(distImages, previewReload));

  watch('./src/assets/sass/**/*.*', series(distStyle, previewReload));

  watch('./src/assets/js/*.js', series(distJs, previewReload));

  watch('./src/assets/js/app.js', series(distScript, previewReload));
}

function distClean() {
  return src('./dist/', { read: false, allowEmpty: true }).pipe(
    clean()
  );
}

exports.dist = series (
  distClean,
  parallel(
    distHTML, distStyle, distVendorStyle, distCss, distFonts, distFontAwesome, distImages, distScript, distVendorScript, distJs
  ),
  watchFiles
) 
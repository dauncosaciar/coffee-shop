const { src, dest, watch, series } = require("gulp");

// CSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// Images
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

function css(done) {
  /*
    Compile SASS
    Steps: 1- Identify .scss file, 2- Compile file, 3- Save .css file
  */

  src("src/scss/app.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("build/css"));

  done();
}

function images() {
  return src("src/img/**/*", { encoding: false })
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));
}

// function images(done) {
//   src("src/img/**/*").pipe(dest("build/img"));

//   done();
// }

function webpVersion() {
  return src("src/img/**/*.{png,jpg}").pipe(webp()).pipe(dest("build/img"));
}

function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*", images);
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.webpVersion = webpVersion;
exports.default = series(images, webpVersion, css, dev);

/*
  series - a task is started, and until it finishes, the next one starts.
  parallel -  all tasks start at the same time
*/

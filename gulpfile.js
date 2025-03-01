const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

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
  return src("src/img/**/*").pipe(dest("build/img"));
}

// function images(done) {
//   src("src/img/**/*").pipe(dest("build/img"));

//   done();
// }

function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*", images);
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.default = series(images, css, dev);

/* 
  series - a task is started, and until it finishes, the next one starts.
  parallel -  all tasks start at the same time 
*/

const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
  // Compile SASS
  // Steps: 1- Identify .scss file, 2- Compile file, 3- Save .css file

  src("src/scss/app.scss").pipe(sass()).pipe(dest("build/css"));

  done();
}

exports.css = css;

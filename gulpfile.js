const { src, dest, series } = require("gulp");
const htmlmin = require("gulp-html-minifier-terser");
const terser = require("gulp-terser");
const optimize = require("gulp-optimize-images");
const cleanCSS = require("gulp-clean-css");
const htmlReplace = require("gulp-html-replace");
// const concat = require("gulp-concat");

const globs = {
  html: "Hangman/**/*.html",
  css: "Hangman/*.css",
  js: "Hangman/*.js",
  img: "Hangman/*.png",
};

function html() {
  return src(globs.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      htmlReplace({
        css: {
          src: "styles/main.css",
          tpl: "<link rel='stylesheet' href='%s'>",
        },
        js: {
          src: "scripts/main.js",
          tpl: '<script src="%s"></script>',
        },
        img: {
          src: "images/hangman.png",
          tpl: "<link rel='icon' type='image/x-icon' href='%s'>",
        },
      })
    )
    .pipe(dest("dist"));
}
exports.html = html;
function css() {
  return src(globs.css).pipe(cleanCSS()).pipe(dest("dist/styles"));
}
exports.css = css;

function js() {
  return src(globs.js).pipe(terser()).pipe(dest("dist/scripts"));
}
exports.js = js;

function img() {
  return src(globs.img, { encoding: false })
    .pipe(
      optimize({
        compressOptions: {
          png: {
            quality: 20,
          },
        },
      })
    )
    .pipe(dest("dist/images"));
}

exports.default = series(html, css, js, img);

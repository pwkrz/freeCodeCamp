const gulp = require('gulp');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
// const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const del = require('del');
const useref = require('gulp-useref');
const browserify = require('browserify');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// gulp.task("tsc", ["clean"], function () {
//     let tsProject = ts.createProject("tsconfig.json");

//     return tsProject.src()
//         .pipe(sourcemaps.init())
//         .pipe(tsProject())
//         .js
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest("./src/temp/js"));
// });
gulp.task('build:ts', function () {
    return browserify({debug: true})
        .add('./src/ts/main.ts')
        .plugin(tsify)
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./src/js/'));
});

gulp.task("css", function(){

    gulp.src("./src/sass/styles.scss")
        .pipe(plumber())
        .pipe(sass.sync())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./src/css"))
        .pipe(browserSync.stream())

});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});

gulp.task("watch", function(){

    gulp.watch("./src/sass/**/*.scss", ["css"]);
    gulp.watch("./src/**/*.ts", ["build:ts"]);
    gulp.watch(["./src/**/*.html", "./src/**/*.js"], browserSync.reload);

});

gulp.task("html", function(){

    gulp.src("./src/**/*.html")
        .pipe(useref())
        .pipe(gulp.dest("./dist"))

});

gulp.task("clean", function(){

    del(["./dist/", "./src/js/temp"])

});

gulp.task("build", function(){

    runSequence("clean", "tsc", "css")

});

gulp.task("default", ["build:ts", "css", "server", "watch"]);
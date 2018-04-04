const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const del = require('del');
const useref = require('gulp-useref');

gulp.task("tsc", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./src/js"));
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
    gulp.watch(["./src/**/*.html", "./src/**/*.js"], browserSync.reload);

});

gulp.task("html", function(){

    gulp.src("./src/**/*.html")
        .pipe(useref())
        .pipe(gulp.dest("./dist"))

});

gulp.task("clean", function(){

    del("dist/")

});

gulp.task("default", ["tsc", "css", "server", "watch"]);
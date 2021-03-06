const gulp = require('gulp');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();
const del = require('del');
const browserify = require('browserify');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const argv = require('yargs').argv;
const fs = require('fs');
const errorLogger = error => console.error(error.toString());

gulp.task('compile:ts', function () {

    return browserify({
            debug: true,
            entries: "./src/ts/main.ts"
        })
        .plugin(tsify)
        .bundle()
        .pipe(plumber())
        .pipe(source('simon.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(plumber())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/js/'));
});

gulp.task("css", function(){

    gulp.src("./src/sass/styles.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass.sync({
            outputStyle: 'compressed',
            outFile: './src/css/styles.css',
            sourceMap: true
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./src/css"))
        .pipe(browserSync.stream())

});

gulp.task('dev:server', function(cb) {
    
    if(argv.server){

        browserSync.init({
            server: {
                baseDir: "./src/"
            }
        });
    
        cb();
    }
});

gulp.task("watch", ["dev:server"], function(){
    
    gulp.watch("./src/sass/**/*.scss", ["css"]);
    gulp.watch("./src/**/*.ts", ["compile:ts"]);
    gulp.watch(["./src/**/*.html", "./src/**/*.js"], browserSync.reload);
});

gulp.task("copy", function(){

    return gulp.src(["./src/index.html", "./src/js/*.js", "./src/css/*.css"], {
            base: "src/"
        })
        .pipe(gulp.dest("dist/"))

});

gulp.task("clean", function(){

    return del("./dist/")

});


gulp.task("build:server", function(){
    
    return argv.server ? browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    }) : null;

});

gulp.task("build", function(){

    let compiled = fs.existsSync("src/js/simon.min.js") && fs.existsSync("src/css/styles.css");

    if (compiled) {
       runSequence("clean", "copy", "build:server");
    } else {
        console.error("Project not compiled. Run 'gulp' first.");
    }
});

gulp.task("default", ["compile:ts", "css", "watch"]);
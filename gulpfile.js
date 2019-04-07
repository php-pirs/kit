var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    googleWebFonts = require('gulp-google-webfonts'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

var options = {
    fontsDir: 'app/fonts',
    cssDir: 'app/css',
    cssFilename: 'fonts.css'
};

gulp.task('less', function () {
    return gulp.src('app/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) //префиксы
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});
gulp.task('code', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('scripts', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('clean', async function () {
    return del.sync('dist');
});
gulp.task('prebuild', async function () {

    var buildCss = gulp.src([
        'app/css/main.css',
    ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});
gulp.task('clear', function (callback) {
    return cache.clearAll();
});
gulp.task('fonts', function () {
    return gulp.src('./fonts.list')
        .pipe(googleWebFonts(options))
        .pipe(gulp.dest('.'))
        ;
});
//bower i font-awesome   скачивает компонент font-awesome
// Для копирования из app/libs/ Там лежат установленные компоненты
gulp.task('copy-awesome', function() {
    gulp.src([
        'app/libs/font-awesome/css/**',
        'app/libs/font-awesome/webfonts/**',
        '!app/libs/font-awesome/**/*.map',
        '!app/libs/font-awesome/.npmignore',
        '!app/libs/font-awesome/*.txt',
        '!app/libs/font-awesome/*.md',
        '!app/libs/font-awesome/*.json'
    ])
        .pipe(gulp.dest('app/font-awesome'))
});

gulp.task('copy-bootstrap', function() {
    gulp.src([
        'app/libs/bootstrap/dist/css/bootstrap-grid.min.css',
    ])
        .pipe(gulp.dest('app/css'))
});


gulp.task('watch', function () {
    gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/less/**/*.less', gulp.parallel('less')); // Наблюдение за less файлами
});
gulp.task('default', gulp.parallel('scripts', 'less', 'fonts', 'browser-sync', 'watch'));
//для сборки на продакшен
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'less', 'scripts'));

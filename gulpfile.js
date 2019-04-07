var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    googleWebFonts = require('gulp-google-webfonts'), // google-fonts
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

var options = {
    fontsDir: 'app/fonts', // в это директорию сбрасываются  скаченные шрифты
    cssDir: 'app/css', // в это директорию сбрасывается css файл со шрифтами
    cssFilename: 'fonts.css' // название файла со шрифтами
};


gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
gulp.task('code', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('scripts', function () {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
    ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('clean', async function () {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});
gulp.task('prebuild', async function () {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css',
    ])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});

gulp.task('img', function () {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // С кешированием
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});
gulp.task('clear', function (callback) {
    return cache.clearAll();
});
gulp.task('fonts', function () {
    return gulp.src('./fonts.list') //от корня проекта указывается какие шрифты нужны для проекта
        .pipe(googleWebFonts(options))// настройки извлечения шрифтов указываюстя выше
        .pipe(gulp.dest('.')) // скачивается в корень проекта, распределяется из настроек указанных в начале.
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
//после этой команды
//bower i bootstrap --save-dev
gulp.task('copy-bootstrap', function() {
    gulp.src([
        'app/libs/bootstrap/dist/css/bootstrap-grid.min.css',
    ])
        .pipe(gulp.dest('app/css'))
});


//после этой команды для иконок
//bower install font-awesome
gulp.task('watch', function () {
    gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
});
gulp.task('default', gulp.parallel('scripts','fonts', 'browser-sync', 'watch'));
//для сборки на продакшен
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'scripts'));

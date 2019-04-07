# kit сборка проекта.

#### Конструктор gulp. 

Сформированн, есть различие в ветках less и sass. 

Этот конструктор позволяет быстро развернуть проект и начать работать.

Для того что бы смотреть в режиме LiveReload
Нужно в консоле с проектом запустить команду gulp default
После чего будет запущен браузер и получен ip:port

Пример:
http://192.168.0.18:3002
По этому адрессу в нутри сети wifi будет доступен сайт.
Можно смотреть в телефоне планшете и на ноуте.

Название файла  | Содержание файла
----------------|----------------------
app/            | содержит все исходные материалы проекта (css, js библиотеки)
app/css/        | содержит css файлы, в том числе и скомпилированные.
app/fonts/      | содержит шрифты скаченные с помощью gulp-google-webfonts
app/img/        | содержит изображения, после сборки на продакшене будет оптимизировать изображения
app/js/         | содержит js файлы.
app/less/       | если используется ветка less. Установлен файл main.less для примера
app/libs/       | по умолчанию установлен bootstrap и jquery компоненты можно дополнять.
app/index.html  | Пример реализациистраницы.
dist/           | папка продакшена, содержит готовый продукт. Сжатые файлы оптимизированные.
node_modules/   | основные модули, нельзя удалять или чистить в этой директории.
.bowerrc        | установщик компонентов команды bower помещяет куда ему укажут.
gulpfile.js     | тут основа всех скриптов для выполнения в консоле команд.
package-lock.json| устанавливается автоматически с модулем.
fonts.list      | тут задаются шрифты

npm i gulp --save-dev
npm init - если нет проекта
npm i browser-sync --save-dev
npm i -g bower (только если с нуля)
-g обозначает глобальную установку
-------------
##### bower установился глобально, устанавливаю только если нет gulp

npm i gulp-less --save-dev (если не установлен и нужно установить)

npm i gulp-sass --save-dev (если не установлен и нужно установить)

npm i --save-dev gulp-concat gulp-uglifyjs

npm i gulp-cssnano gulp-rename --save-dev

npm i del --save-dev

npm i gulp-cache --save-dev

npm i --save-dev gulp-autoprefixer

npm i gulp-imagemin imagemin-pngquant --save-dev

npm i gulp-google-webfonts  --save-dev

npm i --save-dev gulp-concat gulp-uglifyjs gulp-cssnano gulp-rename del gulp-cache gulp-autoprefixer gulp-imagemin imagemin-pngquant gulp-google-webfonts

bower i font-awesome (пока не надо)

bower i jquery --save-dev

bower i bootstrap --save-dev


можно попробовать выполнить коанду

-----------

##### npm i --save-dev gulp-concat gulp-uglifyjs

2 пакета, с помощью них можно собирать библиотеки в управляющем js файле

##### npm i gulp-cssnano gulp-rename --save-dev

для минификации CSS

##### npm i del --save-dev

отчистка папки dist перед сборкой проекта

##### npm i gulp-imagemin imagemin-pngquant --save-dev

для оптимизации картинок

##### npm i gulp-cache --save-dev

кеширование картинок при оптимизации

##### npm i --save-dev gulp-autoprefixer

Автоматическое создание префиксов

##### npm i gulp-google-webfonts  --save-dev

создает в директории [node_modules/] компонент gulp-google-webfonts
Быстрый поиск в total comander CTRL + ALT + текст
далее необходим управляющий файл fonts.list, который содержит название шрифтов.
Нужно указать куда будут сохраняться настройки в файле gulpfile.js

------------------------
bower i font-awesome
bower i jquery --save-dev
bower i bootstrap --save-dev


скачивает и размещяет эти компоненты в директорию которая указывается в этом файле
.bowerrc
у меня это app/libs/
------------------------------
Далее в консоле нужно выполнять команды которые задаются в gulpfile.js
как пример
gulp default
gulp copy-bootstrap
gulp build
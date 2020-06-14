/* 
gulp.task(taskname,callback):创建任务  taskname任务名称  callback执行的回调
gulp.src(url):设置引入文件的路径
gulp.dest():输出文件设置(如果不存在目录名，自动生成)
pipe():管道流(将任务链式连接起来)
gulp 任务名   -- 执行任务
*/


const gulp = require('gulp'); //引入gulp，生成一个gulp对象
const html = require('gulp-minify-html'); //引入html压缩插件  html函数方法
const css = require('gulp-clean-css'); //引入css压缩插件  css函数方法
const sass = require('gulp-sass'); //引入sass编译插件 

//sass
const sourcemaps = require('gulp-sourcemaps'); //引入生成.map文件模块
const plugins = require('gulp-load-plugins')(); //生成.map文件 返回的是一个函数体。需要再次执行。
const script = require('gulp-uglify'); //压缩js的插件

const imagemin = require('gulp-imagemin'); //图片压缩
const watch = require('gulp-watch'); //gulp监听

//压缩html文件 - 引入插件包
gulp.task('uglifyhtml', () => {
    return gulp.src('src/*.html')
        .pipe(html()) //执行html插件包
        .pipe(gulp.dest('dist/'));
});
gulp.task('uglifyhtml1', () => {
    return gulp.src('src/include/*.html')
        .pipe(html()) //执行html插件包
        .pipe(gulp.dest('dist/include'));
});

//sass编译成css - 引入插件包
gulp.task('compilesass', () => {
    return gulp.src('src/scss/*.scss')
        .pipe(plugins.sourcemaps.init()) //初始化gulp-sourcemaps插件
        .pipe(plugins.sass({
            outputStyle: 'compressed' //压缩
        }))
        .pipe(plugins.sourcemaps.write('.')) //通过sourcemaps,生成.map文件
        .pipe(gulp.dest('dist/css/'));
});

//图片压缩 - jpg/gif/bmp/webp/ [png] - imagemin
gulp.task('uglifyimg', () => {
    return gulp.src('src/img/*.{jpg,png,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

// 监听
// 监听插件-gulp-watch()
// 参1:监听的目录，数组的形式
// 参2:通过gulp.parallel()并行监听任务名。
// 监听的任务必须先执行一次，再能进行监听。

gulp.task('default', () => {
    watch(['src/*.html','src/include/*.html', 'src/scss/*.scss','src/img/*.{jpg,png,gif}' ], gulp.parallel('uglifyhtml','uglifyhtml1', 'compilesass','uglifyimg'));
});
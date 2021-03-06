var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css')
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var server = require('gulp-webserver');
// 编辑scss并且压缩
gulp.task('sass',function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./src/css/'))
})
// 合并js并且压缩
gulp.task('js',function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('aa.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/jss'))
})
// 起服务
gulp.task('server',function() {
    return gulp.src('src')
        .pipe(server({
            open:true,
            livereload : true
        }))
})
// 监听scss变化动态
gulp.task('watch',function() {
    gulp.watch('./src/scss/*.scss',gulp.series('sass'))
})
// 默认执行server
gulp.task('default',function() {
    gulp.watch('./src/**/',gulp.series('js','watch','server'));
})
// css
gulp.task('buildcss',function() {
    return gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./build/css/'))
})
// js
gulp.task('buildjs',function() {
    return gulp.src('./src/jss/*.js')
        .pipe(gulp.dest('./build/js/'));
})
// build
gulp.task('build',function() {
    gulp.watch('src',gulp.series('buildcss','buildjs'))
})

// 2.	以自己的名字作为本地的开发分支，在开发分支进行开发，开发完成后合并到master分支提交到远程的master分支（10分）；
// 8.	在gulp中创建default任务，默认执行webserver服务，js，css，watch任务（10分）；
// 10.	创建每一个任务在录屏中都需要有演示，演示成功后进行git版本提交，最后展示git版本提交记录（10分）；

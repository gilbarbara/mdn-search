var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    del  = require('del');

var name = 'MDNSearch.alfredworkflow';

gulp.on('err', function (e) {
    $.util.log('Build failed: ', $.util.colors.red(e.err.message));
    process.exit(1);
});

gulp.task('copy', function () {
    return gulp.src(['info.plist', 'search.php', 'icon.png'])
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['copy'], function () {
    return gulp.src('dist/*')
        .pipe($.zip(name))
        .pipe(gulp.dest('./'));
});

gulp.task('clean', function (cb) {
    return del(['dist/*', 'MDNSearch.alfredworkflow'], cb);
});

gulp.task('hooks', function () {
    del('.git/hooks/pre-commit');
    return gulp.src('.pre-commit')
        .pipe($.symlink('.git/hooks/pre-commit', { log: false }))

});

gulp.task('default', ['hooks', 'clean', 'build']);

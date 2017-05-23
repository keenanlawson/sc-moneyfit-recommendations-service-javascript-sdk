var gulp = require('gulp-help')(require('gulp'));
var del = require('del');

gulp.task('clean-dist', 'Clean distribution directories', function(cb) {
    return del([
        'dist'
    ]);
});

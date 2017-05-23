var gulp = require('gulp-help')(require('gulp'));
var del = require('del');

gulp.task('clean-dev', 'Clean development directories', function(cb) {
    return del([
        'build'
    ]);
});

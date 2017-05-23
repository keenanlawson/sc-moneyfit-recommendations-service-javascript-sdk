var gulp = require('gulp-help')(require('gulp'));
var runSequence = require('run-sequence');

gulp.task('dev-watch', 'Watch development files', function(cb) {
    runSequence(
        'clean-dev',
        'frontend-watch',
        'tests-watch',
        cb
    );
});

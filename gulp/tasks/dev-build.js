const gulp = require('gulp-help')(require('gulp'));
const runSequence = require('run-sequence');

gulp.task('dev-build', 'Build development bundle', function(cb) {
    runSequence(
        'clean-dev',
        'frontend-build',
        cb
    );
});

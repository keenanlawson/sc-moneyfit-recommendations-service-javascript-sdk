var gulp = require('gulp-help')(require('gulp'));
var esLint = require('gulp-eslint');

gulp.task('lint-javascript', 'Inspect JavaScript', function() {

    // Get source files
    return gulp.src([
        'builder/**/*.js',
        'searches/**/*.js',
        'utils/**/*.js',
        'ProviderSearchServiceSDK.js',
        '!node_modules/**'
    ])

    // Lint using config file
    .pipe(esLint({configFile: './.eslintrc'}))

    // Formats the results dependent on your config file or the options you provided to the esLint task above.
    .pipe(esLint.format())

    // Fails the task and emits a gulp error when all files have been linted if an error has been detected (rules set to severity 2).
    .pipe(esLint.failAfterError())
});

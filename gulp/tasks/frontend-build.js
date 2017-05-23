const gulp = require('gulp-help')(require('gulp'));
const webpack = require('webpack');
const clientConfig = require('../../webpack.config.dev');

function onBuild(done) {
    return function(err, stats) {
        if(err) {
            console.log('Error', err);
        }
        else {
            console.log(stats.toString());
        }

        if(done) {
            done();
        }
    }
}

gulp.task('frontend-build', 'Build frontend development bundle', function(done) {
    webpack(clientConfig).run(onBuild(done));
});

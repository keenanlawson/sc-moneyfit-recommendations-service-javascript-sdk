const gulp = require('gulp-help')(require('gulp'));
const requireDir = require('require-dir');

// Pull in all tasks from the following directories:
requireDir('./gulp/tasks', {recurse: true});

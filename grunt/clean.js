'use strict';

module.exports = function (grunt) {

    grunt.config('clean', {
        all: ['dist/*']
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};

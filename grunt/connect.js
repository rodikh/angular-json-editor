'use strict';

module.exports = function (grunt) {

    grunt.config('connect', {
        server: {
            options: {
                keepalive: true,
                port: 3001,
                base: './'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
};

'use strict';

module.exports = function (grunt) {

    grunt.config('concat', {
        options: {
            separator: ''
        },
        dist: {
            options: {
                // Replace all 'use strict' statements in the code with a single one at the top
                // And wrap everything in a self executing anonymous function which scopes window and angular.
                banner: '(function (window, angular) {\n\'use strict\';\n',
                footer: '\n})(window, angular);',
                process: function (src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                        src.replace(/('use strict'|"use strict");/g, '');
                }
            },
            src: ['src/**/*.js'],
            dest: 'dist/angular-json-editor.js',
            nonull: true
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
};

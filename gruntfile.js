'use strict';

/**
 * The main grunt file which loads all other custom tasks
 * and tasks configurations from the /grunt folder.
 *
 * @param grunt {Object}
 */
module.exports = function (grunt) {
    // Project configuration
    var config = {
        pkg: grunt.file.readJSON('package.json')
    };

    // Init grunt
    grunt.initConfig(config);

    // Load tasks and their configurations
    grunt.loadTasks('grunt');

    // Default task
    grunt.registerTask('lint', ['jshint', 'jscs']);

    // Default task
    grunt.registerTask('default', [
        'lint',
        'clean',
        'concat',
        'uglify'
    ]);
};

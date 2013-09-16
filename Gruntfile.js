"use strict";
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: './public/lib',
          install: true,
          cleanTargetDir: true,
          cleanBowerDir: false,
          layout: 'byType',
          varbose: true
        }
      }
    },
    jshint: {
      files: [
        'Gruntfile.js',
        'app/**/*.js',
        'public/javascripts/**/*.js'
      ],
      options: {
        jshintrc: ".jshintrc",
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  // @todo wirte test later
  grunt.registerTask('test', ['jshint'/** , machaTest*/]);
  grunt.registerTask('default', ['bower:install', 'jshint'/**, machaTest*/]);

};
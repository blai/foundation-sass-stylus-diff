'use strict';

exports = module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-exec');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js']
    },

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'dist/scss',
          outputStyle: 'expanded',
          debugInfo: false,
          noLineComments: true
        }
      }
    },

    stylus: {
      compile: {
        options: {
          compress: false,
          // paths: ['path/to/import', 'another/to/import'],
          // urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
          use: [
            require('foundation') // use stylus plugin at compile time
          ]
        },
        files: {
          'dist/stylus/app.css': 'stylus/app.styl'
        }
      }
    },

    exec: {
      diff: {
        command: 'diff -w dist/scss/app.css dist/stylus/app.css > css.diff'
      }
    },

    clean: {
      build: ['dist']
    }
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'compass', 'stylus']);
};

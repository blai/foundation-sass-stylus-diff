'use strict';

var path = require('path');

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

exports = module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-stylus');

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
          require: 'zurb-foundation'
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
            require('zurb-foundation') // use stylus plugin at compile time
          ]
        },
        files: {
          'dist/stylus/app.css': 'stylus/app.styl'
        }
      }
    },

    clean: {
      build: ['dist']
    },

    connect: {
      server: {
        options: {
          port: 3000,
          middleware: function(connect) {
            return [
              folderMount(connect, 'public'),
              folderMount(connect, 'dist')
            ];
          }
        }
      }
    }
  });

  grunt.registerTask('async', function() {
    this.async();
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'stylus', 'compass', 'connect', 'async']);
};

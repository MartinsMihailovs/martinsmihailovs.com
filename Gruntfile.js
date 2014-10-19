module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      browserSync: {
        files: ['_site/js/scripts.js', '_site/css/reset.css', '_site/css/style.css'],
        tasks: ['browserSync']
      }
    },

    uglify: {
      global: {
        files: {
        'js/build/scripts.min.js': ['js/lib/*.js', 'js/scripts.js']
        }
      }
    },

    autoprefixer: {
      style: {
        src: "css/style.css",
        dest: "css/build/style-prefixed.css"
      }
    },

    cssmin: {
      global: {
        files: {
          'css/build/style.min.css': ['css/reset.css', 'css/build/style-prefixed.css']
        }
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: ['_site/css/*.css', '_site/js/scripts.js', '_site/*.html', '_site/img']
        },
        options: {
          proxy: "http://localhost:4000/",
          watchTask: true // < VERY important
        }
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Tasks
  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('build', ['uglify', 'autoprefixer', 'cssmin', 'watch']);

};
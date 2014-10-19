module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      js: {
        files: ['js/responsive-nav.js'],
        tasks: ['uglify']
      },
      browserSync: {
        files: ['_site/css/style.css'],
        tasks: ['browserSync']
      }
    },

    uglify: {
      global: {
        files: {
        'js/scripts.min.js': ['js/lib/*.js', 'js/responsive-nav.js']
        }
      }
    },

    autoprefixer: {
      reset: {
        src: "css/reset-unprefixed.css",
        dest: "css/reset.css"
      },
      style: {
        src: "css/style-unprefixed.css",
        dest: "css/style.css"
      }
    },

    cssmin: {
      global: {
        files: {
          'css/style.min.css': ['css/reset.css', 'css/style.css']
        }
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : '_site/css/style-unprefixed.css'
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

  // Tasks
  grunt.registerTask('default', ['uglify', 'browserSync', 'watch']);
  grunt.registerTask('build', ['uglify', 'autoprefixer', 'cssmin', 'browserSync']);

};
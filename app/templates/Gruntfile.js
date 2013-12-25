
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'app.js',
        'settings.js',
        'models/*.js',
        'public/javascripts/**/*.js',
        '!public/javascripts/vendor/**/*.js',
        'routes/*.js',
        'scripts/*.js',
        'services/**/*.js',
        'sockets/**/*.js'
      ]
    },

    concat: {
      options: {
        stripBanners: true,
        // define a string to put between each file in the concatenated output
        separator: ';',
        banner:  '<%= meta.banner %>'
      },
      'vendor': {
        src: [
          'public/javascripts/vendor/jquery/**/jquery.js',
          'public/javascripts/vendor/jquery.slug.js',
          'public/javascripts/vendor/async/**/async.js',
          'public/javascripts/vendor/markdown/**/markdown.js',
          'public/javascripts/vendor/jquery-ui/**/jquery-ui.js',
          'public/javascripts/vendor/underscore/**/underscore.js',
          'public/javascripts/vendor/backbone/**/backbone.js',
          'public/javascripts/vendor/backbone.iobind/**/backbone.iobind.js',
          'public/javascripts/vendor/backbone.iobind/**/backbone.iosync.js',
          'public/javascripts/vendor/moment/**/moment.js',
          'public/javascripts/vendor/bootstrap/**/bootstrap.js',
          'public/javascripts/vendor/SlitSlider/js/*.js',
          'public/javascripts/vendor/blueimp-load-image/**/load-image.js',
          'public/javascripts/vendor/blueimp-file-upload/**/*iframe-transport.js',
          'public/javascripts/vendor/blueimp-file-upload/**/*fileupload.js',
          'public/javascripts/vendor/blueimp-file-upload/**/*fileupload-process.js',
          'public/javascripts/vendor/blueimp-file-upload/**/*fileupload-image.js',
          'public/javascripts/vendor/blueimp-file-upload/**/*fileupload-validate.js'
        ],
        dest: 'public/javascripts/dist/vendor.js'
      },
      'app': {
        src: [
          'public/javascripts/constants.js',
          'public/javascripts/sortable.js',
          'public/javascripts/utils/utils.js',
          'public/javascripts/utils/safe_string.js',
          'public/javascripts/application.js',
          'public/javascripts/models/base.js',
          'public/javascripts/views/base.js',
          'public/javascripts/models/*.js',
          'public/javascripts/views/*.js',
          'public/javascripts/router.js'
        ],
        dest: 'public/javascripts/dist/app.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        mangle: {toplevel: true},
        squeeze: {dead_code: false},
        codegen: {quote_keys: true}
      },
      'vendor': {
        src: 'public/javascripts/dist/vendor.js',
        dest: 'public/javascripts/dist/vendor.min.js'
      },
      'app': {
        src: 'public/javascripts/dist/app.js',
        dest: 'public/javascripts/dist/app.min.js'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'public/stylesheets/',
        src: ['*.css', '!*.min.css'],
        dest: 'public/stylesheets/',
        ext: '.min.css'
      }
    },

    jasmine: {
      'app': {
        src : ['<%= concat.app.src %>'],
        options: {
          specs : ['spec/javascripts/**/*.spec.js'],
          helpers : 'spec/helpers/*.js',
          vendor: ['node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js',
            '<%= concat.vendor.src %>']
        }
      }
    },

    simplemocha: {
      options: {
        timeout: 100000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: ['spec/node/**/*-test.js']
    },

    watch: {
      scripts: {
        files: ['spec/javascripts/**/*.spec.js'
          ],
        tasks: ['jasmine:app'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('node', 'simplemocha');

  grunt.registerTask('test', ['jasmine:app', 'simplemocha']);

  grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);

  grunt.registerTask('default', ['jshint', 'test', 'build']);

};

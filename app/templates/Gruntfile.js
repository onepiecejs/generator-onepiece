
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
          'public/javascripts/models/activity.js',
          'public/javascripts/views/activity.js',
          'public/javascripts/models/notification.js',
          'public/javascripts/views/notification.js',
          'public/javascripts/models/boardMember.js',
          'public/javascripts/views/boardMembers.js',
          'public/javascripts/models/label.js',
          'public/javascripts/models/syncConfig.js',
          'public/javascripts/views/syncConfig.js',
          'public/javascripts/models/board.js',
          'public/javascripts/views/board.js',
          'public/javascripts/models/list.js',
          'public/javascripts/views/list.js',
          'public/javascripts/models/checklist.js',
          'public/javascripts/views/checklist.js',
          'public/javascripts/models/card.js',
          'public/javascripts/views/card.js',
          'public/javascripts/models/comment.js',
          'public/javascripts/views/comment.js',
          'public/javascripts/models/attachment.js',
          'public/javascripts/views/attachment.js',
          'public/javascripts/models/vote.js',
          'public/javascripts/views/boardlist.js',
          'public/javascripts/views/help.js',
          'public/javascripts/views/welcome.js',
          'public/javascripts/views/confirmDialog.js',
          'public/javascripts/models/visitor.js',
          'public/javascripts/views/boardActiveUsers.js',
          'public/javascripts/views/adminConfig.js',
          'public/javascripts/views/voteConfig.js',
          'public/javascripts/views/commentConfig.js',
          'public/javascripts/router.js',
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
        src : [
          'public/javascripts/utils/utils.js',
          'public/javascripts/utils/safe_string.js',
          'public/javascripts/application.js',
          'public/javascripts/constants.js',
          'public/javascripts/models/base.js',
          'public/javascripts/models/activity.js',
          'public/javascripts/models/board.js',
          'public/javascripts/models/list.js',
          'public/javascripts/models/card.js',
          'public/javascripts/models/comment.js',
          'public/javascripts/models/attachment.js',
          'public/javascripts/models/notification.js',
          'public/javascripts/models/visitor.js',
          'public/javascripts/models/boardMember.js',
          'public/javascripts/models/checklist.js',
          'public/javascripts/models/label.js',
          'public/javascripts/models/vote.js',
          'public/javascripts/models/syncConfig.js',
          'public/javascripts/views/base.js',
          'public/javascripts/views/syncConfig.js',
          'public/javascripts/views/notification.js',
          'public/javascripts/views/card.js',
          'public/javascripts/views/comment.js',
          'public/javascripts/sortable.js',
          'public/javascripts/router.js',
          'public/javascripts/views/activity.js',
          'public/javascripts/views/list.js',
          'public/javascripts/views/board.js',
          'public/javascripts/views/boardMembers.js',
          'public/javascripts/views/boardActiveUsers.js',
          'public/javascripts/views/confirmDialog.js',
          'public/javascripts/views/checklist.js',
          'public/javascripts/views/adminConfig.js',
          'public/javascripts/views/voteConfig.js',
          'public/javascripts/views/commentConfig.js',
          'public/javascripts/views/attachment.js',
          'public/javascripts/vendor/jquery.fileupload.js'
        ],
        options: {
          specs : ['spec/javascripts/**/*.spec.js'],
          helpers : 'spec/helpers/*.js',
          vendor: ['node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js',
            'public/javascripts/dist/vendor.js']
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

  // concat&& uglify task
  grunt.registerTask('default', ['concat:vendor', 'uglify:vendor', 'concat:app',
                                 'uglify:app', 'jasmine:app', 'simplemocha', 'cssmin'
                                 ]);
  //frontend javascript test
  grunt.registerTask('test', ['jasmine:app']);

  grunt.registerTask('node', 'simplemocha');
};

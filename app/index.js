'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var OnepieceGenerator = module.exports = function OnepieceGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function () {
        this.spawnCommand('node', ['scripts/db_init_label_metadata.js']);
      }.bind(this)
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(OnepieceGenerator, yeoman.generators.Base);

OnepieceGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'description',
      message: 'Give me a description on what your app is supposed to do',
      default: 'A sample description'
    }
  ];

  this.prompt(prompts, function (props) {
    this.options.description = props.description;

    cb();
  }.bind(this));
};

OnepieceGenerator.prototype.app = function app() {
  this.directory('models', 'models');
  this.directory('public', 'public');
  this.mkdir('public/attachments');
  this.directory('routes', 'routes');
  this.directory('scripts', 'scripts');
  this.directory('services', 'services');
  this.directory('sockets', 'sockets');
  this.directory('spec', 'spec');
  this.mkdir('uploads');
  this.directory('views', 'views');
};

OnepieceGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

OnepieceGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

OnepieceGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('README.md', 'README.md');
  this.copy('app.js', 'app.js');
  this.copy('lint-config.js', 'lint-config.js');
  this.copy('settings.js', 'settings.js');
  this.copy('settings.json', 'settings.json');
};

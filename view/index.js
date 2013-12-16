'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the view subgenerator with the argument ' + this.name + '.');

  this.sourceRoot(path.join(__dirname, '/templates'));
  this.destinationRoot('public/javascripts/views');
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.createViewFile = function createViewFile() {
  this.copy('view.js', this.name + '.js');
};

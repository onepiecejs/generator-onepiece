'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the model subgenerator with the argument ' + this.name + '.');

  this.sourceRoot(path.join(__dirname, '/templates'));
  this.destinationRoot('public/javascripts/models');
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.createModelFile = function createModelFile() {
  this.template('model.js', this.name + '.js');
};


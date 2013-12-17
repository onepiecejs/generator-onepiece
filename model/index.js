'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var onepieceUtils = require('../utils.js');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the model subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.createModelFile = function createModelFile() {
  var sourceRoot = path.join(__dirname, '/templates/');
  var destinationRoot = 'public/javascripts/models/';
  this.template(sourceRoot + 'model.js', destinationRoot + this.name + '.js');

  onepieceUtils.addScriptTag('model', this.name + '.js');

};


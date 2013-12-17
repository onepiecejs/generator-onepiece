'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var onepieceUtils = require('../utils.js');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the view subgenerator with the argument ' + this.name + '.');
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.createViewFile = function createViewFile() {
  var sourceRoot = path.join(__dirname, '/templates/');
  var destinationRoot = 'public/javascripts/views/';

  this.copy(sourceRoot + 'view.js', destinationRoot + this.name + '.js');

  onepieceUtils.addScriptTag('view', this.name + '.js');
};

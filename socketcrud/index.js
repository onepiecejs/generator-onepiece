'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var SocketcrudGenerator = module.exports = function SocketcrudGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the socketcrud subgenerator with the argument ' + this.name + '.');

  this.sourceRoot(path.join(__dirname, '/templates'));
  this.destinationRoot('sockets/CRUD');
};

util.inherits(SocketcrudGenerator, yeoman.generators.NamedBase);

SocketcrudGenerator.prototype.createSocketCRUD = function createSocketCRUD() {
  this.copy('socketcrud.js', this.name + '.js');
};

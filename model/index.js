'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');

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


  var _this = this;
  var fileName = 'views/application.jade';
  fs.stat(fileName, function(err, stats) {
	if(err) throw err;

    fs.open(fileName, 'r+', function(err, fd) {
      if(err) throw err;

      var fileBuffer = new Buffer(stats.size);
      fs.read(fd, fileBuffer, 0, fileBuffer.length, null, function(error, bytesRead, buffer) {
        if(err) throw err;

        var filContent = buffer.toString('utf-8', 0, buffer.length);
        var isertPosition = filContent.indexOf('//- router')-4;

        var formerPartRef = buffer.slice(0, isertPosition);
        var formerPartContent = formerPartRef.toString('utf-8', 0, formerPartRef.length);
        var formerPartBuffer = new Buffer(formerPartContent, 'utf-8');

        var scriptTagBuffer = new Buffer('    script(type="text/javascript", ' +
          'src="/javascripts/models/'+ _this.name +'.js")\n', 'utf-8');

        var latterPartRef = buffer.slice(isertPosition);
        var latterPartContent = latterPartRef.toString('utf-8', 0, latterPartRef.length);
        var latterPartBuffer = new Buffer(latterPartContent, 'utf-8');

        var updateFileBuffer = new Buffer(formerPartBuffer.length +
          scriptTagBuffer.length + latterPartBuffer.length);
        updateFileBuffer.write(formerPartContent, 'utf-8');
        updateFileBuffer.write('    script(type="text/javascript", ' +
          'src="/javascripts/models/'+ _this.name +'.js")\n', formerPartRef.length, 'utf-8');
        updateFileBuffer.write(latterPartContent, formerPartRef.length +
          scriptTagBuffer.length, 'utf-8');
        fs.writeFile(fileName, updateFileBuffer, function(err) {
            if(err) throw err;

            fs.close(fd);
        });

      });
    });
  });


};


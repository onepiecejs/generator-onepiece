  
'use strict';

var path = require('path');
var fs = require('fs');

exports.addScriptTag = function(type, newFileName) {
  var targetFileName = 'views/application.jade';
  var scriptTagContent;
  if (type === 'model') {
    scriptTagContent = '    script(type="text/javascript", ' +
    'src="/javascripts/models/'+ newFileName +')\n';
  } else {

  }

  fs.readFile(targetFileName, function(err, buffer) {
    if(err) throw err;

    var filContent = buffer.toString('utf-8', 0, buffer.length);
    var insertPosition;
    if (type === 'model') {
      insertPosition = filContent.indexOf('//- router') - 4;
    } else {

    }

    var formerPartRef = buffer.slice(0, insertPosition);
    var formerPartContent = formerPartRef.toString('utf-8');

    var latterPartRef = buffer.slice(insertPosition);
    var latterPartContent = latterPartRef.toString('utf-8');
    
    var updatedFileBuffer = new Buffer(formerPartRef.length + scriptTagContent.length +
      latterPartRef.length);
    updatedFileBuffer.write(formerPartContent);
    updatedFileBuffer.write(scriptTagContent, formerPartRef.length);
    updatedFileBuffer.write(latterPartContent, formerPartRef.length + scriptTagContent.length);

    fs.writeFile(targetFileName, updatedFileBuffer, function(err) {
      if(err) throw err;

      console.log('script tag referring to this file has been added into the main page.');
    });

  });

};
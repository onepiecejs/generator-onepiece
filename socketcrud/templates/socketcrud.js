
(function (module) {
  'use strict';
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  <% var uppercaseClassName =  _(name).camelize().capitalize(); %>

  var async = require('async');
  var util = require('util');
  var fs = require('fs');
  var BaseCRUD = require('./base');
  var signals = require('../signals');

  function <%= uppercaseClassName %>CRUD(options) {
    BaseCRUD.call(this, options);
    this.modelClass = require('../../models/<%= _.camelize(name) %>');
    this.key = this.modelClass.modelName.toLowerCase();
  }

  util.inherits(<%= uppercaseClassName %>CRUD, BaseCRUD);

  <%= uppercaseClassName %>CRUD.prototype._create = function (data, callback) {

  };

  <%= uppercaseClassName %>CRUD.prototype._read = function (data, callback) {

  };

  <%= uppercaseClassName %>CRUD.prototype._delete = function (data, callback) {

  };

  <%= uppercaseClassName %>CRUD.prototype._patch = function(data, callback) {

  };

  module.exports = <%= uppercaseClassName %>CRUD;
}(module));

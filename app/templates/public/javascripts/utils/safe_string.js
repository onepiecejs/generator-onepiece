

(function ($, _, Backbone) {

  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  var tagsToReplace = {
    '&': "&amp;",
    '<': "&lt;",
    '>': "&gt;"
  };

  var replaceTag = function(tag) {
    return tagsToReplace[tag] || tag;
  };

  var utils = <%= namespace %>.utils || {};

  // Ref: http://jsperf.com/encode-html-entities
  utils.safeString = function(str) {
    return str.replace(/[&<>]/g, replaceTag);
  };

  utils.escapeString = function(str) {
    return str.replace(/\n/g, "<br/>").replace(/ /g, "&nbsp;");
  };

  <%= namespace %>.utils = utils;

}(jQuery, _, Backbone));

// Provide top-level namespaces for our javascript.
$(function ($, _, Backbone) {

  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  window.<%= namespace %> = window.<%= namespace %> || {};
  <%= namespace %>.models = {};
  <%= namespace %>.socket = io.connect("" + 
    document.location.protocol + 
    "//" + document.location.hostname, {
    "reconnect": true,
    "max reconnection attempts": 100,
    "max reconnection delay": 32000,
    "reconnection delay": <%= namespace %>.utils.randomWait(100,1000)
    });
  <%= namespace %>.views = {};

  <%= namespace %>.setTitle = function(title) {
    window.document.title = "<%= namespace %>|" + title;
  };

}(jQuery, _, Backbone));

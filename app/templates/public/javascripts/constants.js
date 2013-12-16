
(function() {

  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  var <%= namespace %> = window.<%= namespace %> || {};

  <%= namespace %>.KEY_CODES = {
    SPACE: 32,
    COMMA: 188,
    ENTER: 13,
    BACKSPACE: 8,
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39,
  };

  window.<%= namespace %> = <%= namespace %>;

}());
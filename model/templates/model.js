
(function ($, _, Backbone) {
  'use strict';
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  <% var lowercaseClassName =  _.camelize(name).toLowerCase(); %>
  <% var uppercaseClassName =  _(name).camelize().capitalize(); %>

  <%= namespace %>.models.<%= uppercaseClassName %> = <%= namespace %>.models.BaseModel.extend({
    urlRoot: '<%= lowercaseClassName %>'
  });

  <%= namespace %>.models.<%= uppercaseClassName %>Collection = <%= namespace %>.models.BaseCollection.extend({
    model: <%= namespace %>.models.<%= uppercaseClassName %>,
    url: '/<%= lowercaseClassName %>',

    serverCreate: function (data) {

    },

    comparator: function() {

    }

  });

}(jQuery, _, Backbone));

   


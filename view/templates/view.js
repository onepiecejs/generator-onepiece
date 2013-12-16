
(function ($, _, Backbone) {

  'use strict';
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  <% var uppercaseClassName =  _(name).camelize().capitalize(); %>

  <%= namespace %>.views.<%= uppercaseClassName %>View = <%= namespace %>.views.BaseView.extend({

    template: ,

    events: {

    },

    initialize: function() {

    },

    render: function() {

    }

  });

}(jQuery, _, Backbone));

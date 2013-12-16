// Help View

(function ($, _, Backbone) {
  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  <%= namespace %>.views.HelpView = Backbone.View.extend({
    el: '.content',

    events: {
    },

    template: jade.compile($("#template-help-view").text()),

    close: function() {
      this.remove();
    },

    remove: function() {
      this.undelegateEvents();
      this.$el.empty();
      this.stopListening();
      return this;
    },

    render: function(context) {
      this.$el.html(this.template());
      <%= namespace %>.setTitle(context.title);
    }
  });

}(jQuery, _, Backbone));


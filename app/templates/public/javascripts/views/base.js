(function ($, _, Backbone) {

  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  /*
   * View to render each section to show an Activity log
   */
  <%= namespace %>.views.BaseView = Backbone.View.extend({
    close: function() {
      if (this.model) {
        this.model.dispose();
      }

      this.remove();
    }
  });


}(jQuery, _, Backbone));

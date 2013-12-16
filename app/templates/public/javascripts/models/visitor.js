// visitor model

(function ($, _, Backbone) {
  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  <%= namespace %>.models.BoardVisitor = <%= namespace %>.models.BaseModel.extend({
    urlRoot: "boardvisitor"
  });

  <%= namespace %>.models.BoardVisitorCollection = <%= namespace %>.models.BaseCollection.extend({
    url: "/boardvisitor",
    model: <%= namespace %>.models.BoardVisitor,

    initialize: function() {

      if (!this.noIoBind) {
        this.ioBind("create", this.serverCreate, this);
      }
    }

  });

}(jQuery, _, Backbone));

(function ($, _, Backbone) {

  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  <%= namespace %>.models.Checklist = <%= namespace %>.models.BaseModel.extend({
    urlRoot: "checklist",

    initialize: function (attributes, options) {
      this.itemCollection = new <%= namespace %>.models.ChecklistItemCollection([], {
        container: this
      });

      var parent = <%= namespace %>.models.BaseModel;
      parent.prototype.initialize.apply(this, arguments);
    },

    /*
     * Remove all event listeners from checklist and the collection of items.
     */
    dispose: function() {
      if (this.itemCollection) {
        this.itemCollection.dispose();
      }
      this.itemCollection = null;

      var parent = <%= namespace %>.models.BaseModel;
      parent.prototype.dispose.apply(this, arguments);
    }

  });

  <%= namespace %>.models.ChecklistCollection = <%= namespace %>.models.BaseCollection.extend({
    url: "/checklist",
    model: <%= namespace %>.models.Checklist,

    initialize: function(models, options) {
      if (!this.noIoBind) {
        this.ioBind("create", this.socket, this.serverCreate, this);
      }

      var _options = options || {};
      if (_options.card === undefined) {
        throw new Error("Missing card object.");
      }
      this.card = _options.card;
    },

    comparator: function(checklist) {
      return checklist.get("createdOn");
    },

    serverCreate: function(data) {
      if (data.cardId === this.card.id) {
        this.add(data);
      }
    },

    dispose: function() {
      this.card = null;
      if (!this.noIoBind) {
        this.ioUnbindAll();
      }

      var parent = <%= namespace %>.models.BaseCollection;
      parent.prototype.dispose.apply(this, arguments);
    }
  });

  <%= namespace %>.models.ChecklistItem = <%= namespace %>.models.BaseModel.extend({
    urlRoot: "checklistitem"
  });

  <%= namespace %>.models.ChecklistItemCollection = <%= namespace %>.models.BaseCollection.extend({
    url: "/checklistitem",
    model: <%= namespace %>.models.ChecklistItem,

    initialize: function(models, options) {
      if (!this.noIoBind) {
        this.ioBind("create", this.socket, this.serverCreate, this);
      }
      var _options = options || {};
      if (_options.container === undefined) {
        throw new Error("Missing container that ChecklistItem collection must have one.");
      }
      this.container = _options.container;
    },

    serverCreate: function(checklistItem) {
      if (checklistItem.checklistId === this.container.id) {
        this.add(checklistItem);
      }
    },

    comparator: function(item) {
      return item.get("order");
    }

  });

}(jQuery, _, Backbone));

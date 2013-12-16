// Board Model

(function ($, _, Backbone) {

  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  <%= namespace %>.models.Board = <%= namespace %>.models.BaseModel.extend({
    idAttribute: "_id",
    noIoBind: false,
    socket: <%= namespace %>.socket,
    url: function () {
      return "/board" + ((this.id) ? '/' + this.id : '');
    },

    initialize: function () {
      // nested collections inside `Board`.
      // ref: http://backbonejs.org/#FAQ-nested
      this.listCollection = new <%= namespace %>.models.ListCollection();
      this.syncConfigCollection = new <%= namespace %>.models.SyncConfigCollection();

      if (!this.noIoBind) {
        this.ioBind('update', this.serverChange, this);
        this.ioBind('delete', this.serverDelete, this);
      }
    },

    dispose: function() {
      this.off();
      this.listCollection.off();
      this.syncConfigCollection.off();
      if (!this.noIoBind) {
        this.ioUnbindAll();
        this.listCollection.dispose();
        this.syncConfigCollection.dispose();
      }

      return this;
    },

    validate: function(attrs, options) {
      var title = attrs.title;
      if (title === undefined) {
        return "Board does not contain a title.";
      }
      if (/^\s+$/.test(title)) {
        return "It's recommended that you enter a significant board's title.";
      }

      var desc = attrs.description;
      if (desc === undefined) {
        return "Board does not contain a description.";
      }
      if (/^\s+$/.test(desc)) {
        return "It's recommended that you enter a significant board's description.";
      }
    },

    serverChange: function (data) {
      this.set(data);
    },

    serverDelete: function (data) {
      if (typeof this.collection === 'object') {
        this.collection.remove(this);
      } else {
        this.trigger('remove', this);
      }
    },

    modelCleanup: function () {
      this.ioUnbindAll();
      return this;
    }

  });

  <%= namespace %>.models.BoardCollection = Backbone.Collection.extend({
    model: <%= namespace %>.models.Board,
    socket: <%= namespace %>.socket,

    url: "/board",

    initialize: function () {
      this.on('collectionCleanup', this.collectionCleanup, this);
      this.bindCreateEvent(this.socket);
    },

    bindCreateEvent: function(socket) {
      socket.removeAllListeners("/board:create");
      socket.on('/board:create', this.serverCreate, this);
    },

    serverCreate: function (data) {
      if (data) {
        // make sure no duplicates, just in case
        var obj = <%= namespace %>.boards.get(data._id);
        if (typeof obj === 'undefined') {
          <%= namespace %>.boards.add(data);
        } else {
          obj.set(data);
        }
      }
    },

    collectionCleanup: function (callback) {
      this.ioUnbindAll();
      this.each(function (model) {
        model.modelCleanup();
      });
      return this;
    },

    status: function () {
      return this.filter(function (obj) { return obj.get('status'); });
    }

  });

}(jQuery, _, Backbone));

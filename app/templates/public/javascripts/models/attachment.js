//model attachment

(function ($, _, Backbone) {
  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  <%= namespace %>.models.Attachment = <%= namespace %>.models.BaseModel.extend({
    idAttribute: "_id",
    noIoBind: false,
    socket: <%= namespace %>.socket,
    url: function () {
      return "/attachment" + ((this.id) ? '/' + this.id : '');
    },

    initialize: function () {
      if (!this.noIoBind) {
        this.ioBind('update', this.serverChange, this);
        this.ioBind('delete', this.serverDelete, this);
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


  //Collection
  <%= namespace %>.models.AttachmentCollection = <%= namespace %>.models.BaseCollection.extend({
    model: <%= namespace %>.models.Attachment,
    socket: <%= namespace %>.socket,

    url: "/attachment",

    initialize: function () {
      this.socket.removeAllListeners("/attachment:create");
      this.socket.on('/attachment:create', this.serverCreate, this);
    },

    serverCreate: function (data) {
      if (data) {
        var card = <%= namespace %>.utils.getCardModelById(data.cardId);
        if (card) {
          card.attachmentCollection.add(data);
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

    // sort attachments by 'createdOn' in ascending order
    comparator: function(a, b) {
      if (a.get('createdOn') > b.get('createdOn')) {
        return 1;
      }
      if (a.get('createdOn') < b.get('createdOn')) {
        return -1;
      }
      return 0;
    }

  });

}(jQuery, _, Backbone));

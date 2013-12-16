(function ($, _, Backbone) {

  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  var BaseModel = <%= namespace %>.models.BaseModel;
  var BaseCollection = <%= namespace %>.models.BaseCollection;

  <%= namespace %>.models.Label = BaseModel.extend({
    urlRoot: 'label'
  });

  <%= namespace %>.models.LabelCollection = BaseCollection.extend({
    model: <%= namespace %>.models.Label,
    url: '/label',

    initialize: function(models, options) {
      _.bindAll(this, "serverCreate");
      if (!this.noIoBind) {
        this.ioBind("create", this.socket, this.serverCreate, this);
      }
    }
  });

  <%= namespace %>.models.CardLabelRelation = BaseModel.extend({
    urlRoot: 'cardlabelrelation'
  });

  <%= namespace %>.models.CardLabelRelationCollection = BaseCollection.extend({
    model: <%= namespace %>.models.CardLabelRelation,
    url: 'cardlabelrelation',

    /*
     * Due to the number of labels of a card is fixed, we don't need listen to
     * create event. So, override this function to disable default behavior,
     * and add other possible actions.
     */
    initialize: function(models, options) {
    },

    comparator: function(relation) {
      return relation.get('cardId').order;
    }
  });

}(jQuery, _, Backbone));

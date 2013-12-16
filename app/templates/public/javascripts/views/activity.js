/*
 * Activity logs shown in right side of board page. It shows everyone's action
 * in the current opening board.
 */

(function ($, _, Backbone) {

  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  /*
   * View to render each section to show an Activity log
   */
  <%= namespace %>.views.ActivityView = Backbone.View.extend({
    tagName: "li",

    template: jade.compile($('#activity-item-template').text()),

    initialize: function(options) {
      this.render();
    },

    render: function() {
      var activity = this.model.toJSON();
      activity.content = <%= namespace %>.utils.safeString(activity.content);
      activity.createdOn = <%= namespace %>.utils.formatDate(activity.createdOn);
      this.$el.html(this.template(activity));
      return this;
    }

  });

  /*
   * View needs ActivityCollection to listen to event that an Activity is added
   * in server-side. When catch this event, view will render an area with the
   * newly added Activity object and display it in Activities area.
   */
  <%= namespace %>.views.ActivityCollectionView = Backbone.View.extend({
    initialize: function(options) {
      this.collection.on("add", this.showOneActivity, this);
      this.activitiesContainer = $(".activity.side-bar").find("ul").first();
      this.showActivitiesOnlyOnce();

      // To show activities bar
      // Id is defined in an Anchor tag within board header section
      $("#toggleActivities").on("click", this, this.toggleActivities);
      // To hide activities bar
      $(".activity .collapse-bar").on("click", this, this.toggleActivities);
      $(".activity header a").on("click", this, this.toggleActivities);
    },

    getCurrentBoardId: function() {
      return <%= namespace %>.utils.getCurrentBoardModel().id;
    },

    toggleActivities: function(event) {
      $(".activity").toggle("slide", { direction: "right" }, "fast");
    },

    showOneActivity: function(model) {
      var activityView = new <%= namespace %>.views.ActivityView({ model: model });
      this.activitiesContainer.prepend(activityView.el);
    },

    /*
     * Load current board's activities only once.
     */
    showActivitiesOnlyOnce: function() {
      if (this.activitiesLoaded) {
        return;
      }
      this.activitiesLoaded = true;
      this.collection.fetch({
        data: {boardId: this.getCurrentBoardId()}
      });
    },

    remove: function() {
      this.collection.dispose();
      this.undelegateEvents();
      this.stopListening();
      return this;
    }

  });

}(jQuery, _, Backbone));

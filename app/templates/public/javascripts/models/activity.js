/*
 * Models for displaying Activity logs.
 */

(function ($, _, Backbone) {

  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  <%= namespace %>.models.Activity = <%= namespace %>.models.BaseModel.extend({
    idAttribute: "_id",
    socket: <%= namespace %>.socket,
    urlRoot: "activity",

    url: function () {
      return "/activity/" + this.id;
    }

  });

  <%= namespace %>.models.ActivityCollection = <%= namespace %>.models.BaseCollection.extend({
    /*
     * With this url, collection responds all events whose name match
     * activities:[action]
     */
    url: "/activity",
    model: <%= namespace %>.models.Activity,

    comparator: function (activity) {
      return activity.get("createdOn");
    }
  });

}(jQuery, _, Backbone));

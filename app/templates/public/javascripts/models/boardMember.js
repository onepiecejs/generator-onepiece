// Board member Model

(function ($, _, Backbone) {

  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  <%= namespace %>.models.BoardMember = <%= namespace %>.models.BaseModel.extend({
    // FIXME: user is not correct. Should be boardmemberrelation.
    urlRoot: "user"
  });

  /*
   * Container of member relations.
   */
  <%= namespace %>.models.BoardMemberCollection = <%= namespace %>.models.BaseCollection.extend({
    url: "/boardmemberrelation",
    model: <%= namespace %>.models.BoardMember
  });

}(jQuery, _, Backbone));

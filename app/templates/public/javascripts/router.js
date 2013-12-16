// Provide top-level namespaces for our javascript.
$(function ($, _, Backbone) {

  "use strict";
  <% var namespace = _.camelize(appname).toLowerCase(); %>
  window.<%= namespace %> = window.<%= namespace %> || {};

  var isMember = false;

  var Router = Backbone.Router.extend({
    routes: {
      "": "home",
      "boards/new": "newBoard",
      "boards/:query": "listBoards",
      "board/:boardId(/:slug)": "joinBoard",
      "card/:cardId(/:slug)": "renderCardDetail",
      "help": "help",
      "welcome": "welcome",
      "search/:query": "search"
    },

    currentView: null,

    switchView: function(view, context){
      if (this.currentView){
        this.currentView.close();
      }

      // Handle board leave
      var sock = <%= namespace %>.socket;
      if (this.currentView && this.currentView.boardTitleView) {
        //logout the board
        var leaveBoardId = this.currentView.model.id;
        sock.emit('user-logout', {boardId: leaveBoardId, user: <%= namespace %>.utils.getCurrentUser()});
      }

      this.currentView = view;
      this.currentView.render(context);

      // check the switch view is boardView
      if (view && view.boardTitleView) {
        var joinBoardId = view.model.id;
        sock.emit('join-board', joinBoardId);
      }
    },

    home: function(){
      if(<%= namespace %>.utils.isBrowserVersionLow()) {
        <%= namespace %>.utils.renderBrowserVesionPrompt();
      }
      else {
        this.navigate("boards/mine", {trigger: true, replace: true});
      }
    },

    listBoards: function(query) {
      var that = this;
      if(<%= namespace %>.utils.isBrowserVersionLow()) {
        <%= namespace %>.utils.renderBrowserVesionPrompt();
      }
      else {
        $("body div.process-loading").show();
        $.ajax({
          url: '/api/' + query,
          success: function(boards) {
            $("body div.process-loading").hide();
            var boardsView = new <%= namespace %>.views.BoardsView();
            that.switchView(boardsView, {"title": query, "boards": boards});
            $(".board-option").find(".active").removeClass("active");
            $(".js-boards-" + query).parent().addClass("active");
          },
          error: function() {
            <%= namespace %>.utils.renderTimeoutBox();
            return false;
          }
        });
      }
    },

    joinBoard: function(boardId) {
      var sock = <%= namespace %>.socket;
      var that = this;
      if(<%= namespace %>.utils.isBrowserVersionLow()) {
        <%= namespace %>.utils.renderBrowserVesionPrompt();
      }
      else {
        sock.once('joined-board', function(result) {
          if (result.ok === 1) {
            if (result.message === 'closed') {
              alert('This board is closed by board creator. Any further operation, please contact the creator.');
              that.navigate("boards/mine",{
                trigger: true, replace: true
              });
            } else if (result.message === 'nologin') {
              that.navigate("boards/mine", {
                trigger: true, replace: true
              });
              alert('You can\'t access a private Board! Please let Board admin invite you as an board member firstly!');
            } else {
              that.navigate("boards/mine",{
                trigger: true, replace: true
              });
              <%= namespace %>.utils.renderTimeoutBox();
            }
          } else if (result.ok === 0) {
              isMember = (result.message === 'isMember') ? true : false;
              //build visitor collection
              var visitors = that.setupVisitorCollection(result.visitors);
              that.renderBoard(boardId, visitors);
          } else {
            that.navigate("boards/mine",{
                trigger: true, replace: true
              });
            alert('You came across a unknown bug, please file a bug to <%= namespace %>-dev-list@redhat.com and help <%= namespace %> project, thanks a lot.');
          }
        });
        // sock.once('reconnect', function() {
        //   sock.emit('join-board', boardId);
        // });
        sock.emit('join-board', boardId);
      }
    },

    setupVisitorCollection: function(visitors) {
      return new <%= namespace %>.models.BoardVisitorCollection(visitors);
    },

    renderBoard: function(boardId,visitors) {
      var that = this;
      var board = new <%= namespace %>.models.Board({ _id: boardId });
      board.fetch({
        success: function (model, response, options){
          var boardView = new <%= namespace %>.views.BoardView({
            model : model,
            response : response,
            options: options,
            isMember: isMember,
            visitors: visitors
          });
          // render board
          that.switchView(boardView);
          that.navigate("board/" + boardId + "/" + $.slug(response.title), {trigger: false, replace: true});
        },
        error: function(model, xhr, options) {
          console.log('fail');
        }
      });
    },

    renderCardDetail: function(cardId) {
      var that = this;
      var card = new <%= namespace %>.models.Card({_id: cardId});
      card.fetch({
        success: function(model, response, options) {
          var list = new <%= namespace %>.models.List({_id: response.listId});
          list.fetch({
            success: function(model, response, options) {
              that.navigate("board/" + response.boardId, {trigger: true, replace: true});
              var interval = setInterval(function(){
                var cardview = $("#" + cardId).find(".card-title");
                if(cardview.length > 0){
                  cardview.trigger("click");
                  clearInterval(interval);
                }
              }, 100);
            }
          });
        }
      });
    },

    help: function() {
      if(<%= namespace %>.utils.isBrowserVersionLow()) {
        <%= namespace %>.utils.renderBrowserVesionPrompt();
      }
      else {
        var helpView = new <%= namespace %>.views.HelpView();
        this.switchView(helpView, {title: "Help"});
      }
    },

    welcome: function() {
      var welcomeView = new <%= namespace %>.views.WelcomeView();
      this.switchView(welcomeView, {title: "Welcome"});
    },

    search: function(query) {
    },

    newBoard: function() {
      var query = 'new';
      var that = this;
      $.ajax({
        url: '/api/' + query,
        success: function(board) {
          that.joinBoard(board.boardId);
        },
        error: function() {
          <%= namespace %>.utils.renderTimeoutBox();
          return false;
        }
      });
    }
  });

  <%= namespace %>.appRouter = new Router;

  Backbone.history.start({pushState: true});

  <%= namespace %>.navigateTo = function(url) {
    <%= namespace %>.appRouter.navigate(url, {trigger: true});
  }

  <%= namespace %>.appRouter.notificationView = new <%= namespace %>.views.NotificationView();
  <%= namespace %>.socket.on('/notification:create', function(data){
    var obj = new <%= namespace %>.models.Notification(data);
    <%= namespace %>.appRouter.notificationView.notificationCollection.add(data);
  });

  <%= namespace %>.socket.on("cover:update", function(data){
    var card = <%= namespace %>.utils.getCardModelById(data.cardId);
    card.set("cover", data.cover);
  });

  <%= namespace %>.socket.on("badges:update", function(data){
    var card = <%= namespace %>.utils.getCardModelById(data.cardId);
    card.set("badges", data.badges);
  });

  /*
   * FIXME: import-trello-complete is trigger by a specifed board,here we
   * should be add a boardId to eventName, it will help every board recevied
   * a dedicate msg, and in context, the message only happen in one board,
   * not in router, the global interface, So sometime, we need move this bind
   * to board level declaration
   */
  <%= namespace %>.socket.on("alert-import-trello-complete", function(data){
    <%= namespace %>.utils.renderImportTrelloBox();
  });

}(jQuery, _, Backbone));

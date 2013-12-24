<% var namespace = _.camelize(appname).toLowerCase(); %>
describe("updateCardVoteTest", function() {
  var board;
  var boardView;
  var cardVote;
  var cardVoteView;
  var cardVoteCollection;

  beforeEach(function(){
    $('<div class="window-vote"></div>').appendTo('body');
    board = new <%= namespace %>.models.Board({
      _id: '51c2adf162c1edba14000071',
      creatorId: '51c2adf162c1edba14000070',
      title: 'Public Board for testing',
      description: 'Board description',
      isClosed: false,
      isPublic: true,
      voteStatus: 'opened'
    });

    boardView = new <%= namespace %>.views.BoardView({
      model: board,
      isMember: true,
      visitors: new <%= namespace %>.models.BoardVisitorCollection([])
    });

    cardVoteCollection = new <%= namespace %>.models.VoteCollection();

    cardVote = new <%= namespace %>.models.Vote({
      cardId: '51c2adf162c1edba14000011',
      authorId: '51c2adf162c1edba14000070'
    });

    cardVoteCollection.add(cardVote);

    cardVoteView = new <%= namespace %>.views.CardVoteView({
      collection: cardVoteCollection,
      card: new <%= namespace %>.models.Card({
        _id: '51c2adf162c1edba14000011',
        title: 'test-card',
        creatorId: '51c2adf162c1edba14000070',
        description: 'description of card',
        boardId: '51c2adf162c1edba14000071',
        assignees: []
      })
    });

    loadFixtures('cardVote.html');

    spyOn(<%= namespace %>.utils, 'getCurrentUser').andCallFake(function() {
      var user = {};
      user.id = '51c2adf162c1edba14000070';
      return user;
    });

    <%= namespace %>.appRouter.currentView = boardView;
    cardVoteView.template = jade.compile($("#template-card-vote-view").text());
    cardVoteView.render().$el.appendTo('body');

  });

  it("the agree button should be checked and unchecked", function() {
    cardVoteView.$el.find("a.js-vote-agree").trigger("click");
    expect(cardVoteView.$el.find("a.js-vote-agree")).toHaveClass('checked');
    cardVoteView.$el.find("a.js-vote-agree").trigger("click");
    expect(cardVoteView.$el.find("a.js-vote-agree")).not.toHaveClass('checked');
  });

  it("the disagree button should be checked and unchecked", function() {
    cardVoteView.$el.find("a.js-vote-disagree").trigger("click");
    expect(cardVoteView.$el.find("a.js-vote-disagree")).toHaveClass("checked");
    cardVoteView.$el.find("a.js-vote-disagree").trigger("click");
    expect(cardVoteView.$el.find("a.js-vote-disagree")).not.toHaveClass('checked');
  });

  afterEach(function() {
    cardVoteView.remove();
    $('div.window-vote').empty();
  });
});
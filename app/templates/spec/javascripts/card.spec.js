<% var namespace = _.camelize(appname).toLowerCase(); %>
describe('CardViewTest', function() {
  var card;
  var cardView;
  beforeEach(function() {
    var badges = {
      comments: 0,
      checkitems: 0
    };

    card = new <%= namespace %>.models.Card({
      title: 'test-card',
      creatorId: '51c2adf162c1edba14000070',
      description: 'description of card',
      assignees: [],
      badges: badges
    });

    cardView = new <%= namespace %>.views.CardView({
      model: card,
      attributes: {index: 0}
    });

    window.<%= namespace %>.isBoardMember = false;
    <%= namespace %>.appRouter = new Backbone.Router;

    loadFixtures("cardBadges.html");
    cardView.template = jade.compile($('#template-card-view').text());
    cardView.render().$el.appendTo('body');

    spyOn(<%= namespace %>.appRouter, 'navigate').andReturn(true);

    spyOn(cardView, 'showCardMenu').andCallFake(function() {});
    spyOn(cardView, 'showCardSettingIcon').andCallFake(function() {});
    spyOn(cardView, 'showCardDetail').andCallFake(function() {});

    //refresh the events of to call the new spyed method.
    cardView.delegateEvents();
    cardView.disableEvents();
  });

  it('click card title should show card detail', function() {
    cardView.$el.find('div.card-title').trigger('click');
    expect(cardView.showCardDetail).toHaveBeenCalled();
  });

  it('click card setting icon should not show card menu', function() {
    cardView.$el.find('.card-setting').trigger('click');
    expect(cardView.showCardMenu).not.toHaveBeenCalled();
  });

  it('mouse enter the card view should not show card settings', function() {
    cardView.$el.find('.card').trigger('mouseenter');
    expect(cardView.showCardSettingIcon).not.toHaveBeenCalled();
  });
});


describe('Card detail page test', function() {
  var card;
  var cardDetailView;
  var cardLabelRelationCollection;

  beforeEach(function() {
    $('<div id="card-detail"></div>').appendTo('body');
    loadFixtures('cardDetail.html');

    card = new <%= namespace %>.models.Card({
      title: 'test-card',
      creatorId: '51c2adf162c1edba14000070',
      description: 'description of card',
      assignees: []
    });

    var board = new <%= namespace %>.models.Board({});
    var boardView = new <%= namespace %>.views.BoardView({
      model: board,
      isMember: true,
      visitors: [],
    });

    cardLabelRelationCollection = new <%= namespace %>.models.CardLabelRelationCollection;
    voteCollection = new <%= namespace %>.models.VoteCollection;

    cardDetailView = new <%= namespace %>.views.CardDetailsView({
      el: $('#card-detail'),
      model: card,
      cardLabelCollection: cardLabelRelationCollection,
      voteCollection: voteCollection
    });

    cardDetailView.template = jade.compile($('#template-card-detail-view').text());

    window.<%= namespace %>.isBoardMember = false;
    spyOn(<%= namespace %>.utils, 'getCurrentCommentStatus').andReturn('opened');
    spyOn(<%= namespace %>.utils, 'getCurrentBoardView').andReturn(boardView);
    cardDetailView.render();

    spyOn(cardDetailView, 'addComment').andCallFake(function() {});
    spyOn(cardDetailView, 'openEditTitleDialog').andCallFake(function() {});
    spyOn(cardDetailView, 'toggleAssignWindow').andCallFake(function() {});
    spyOn(cardDetailView, 'toggleLabelWindow').andCallFake(function() {});
    spyOn(cardDetailView, 'onChecklistClick').andCallFake(function() {});
    spyOn(cardDetailView, 'openEditDescDialog').andCallFake(function() {});

    //refresh the events of to call the new spyed method.
    cardDetailView.delegateEvents();
    cardDetailView.disableEvents();

  });

  it('click js-add-comment icon should call function of addComment', function() {
    cardDetailView.$el.find('.js-add-comment').trigger('click');
    expect(cardDetailView.addComment).toHaveBeenCalled();
  });

  it('card title should not editable', function() {
    cardDetailView.$el.find('.js-edit-title').trigger('click');
    expect(cardDetailView.openEditTitleDialog).not.toHaveBeenCalled();
  });

  it('assignees should not editable', function() {
    cardDetailView.$el.find('a.js-edit-assign').trigger('click');
    expect(cardDetailView.toggleAssignWindow).not.toHaveBeenCalled();
  });

  it('labels should not editable', function() {
    cardDetailView.$el.find('a.js-edit-label').trigger('click');
    expect(cardDetailView.toggleLabelWindow).not.toHaveBeenCalled();
  });

  it('checklist should not addable', function() {
    cardDetailView.$el.find('a.js-add-checklist').trigger('click');
    expect(cardDetailView.onChecklistClick).not.toHaveBeenCalled();
  });

  it('description should not editable', function() {
    cardDetailView.$el.find('h4.js-edit-desc').trigger('click');
    expect(cardDetailView.openEditDescDialog).not.toHaveBeenCalled();
  });

  it('edit description icon should not show', function() {
    expect(cardDetailView.$el.find('a .js-edit-desc')).toHaveCss({display: "none"});
  });

});

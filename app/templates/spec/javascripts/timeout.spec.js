<% var namespace = _.camelize(appname).toLowerCase(); %>
describe('user session timeout', function(){

  it('#renderTimeoutBox window', function(){
    loadFixtures('timeout.html');
    expect($('body').find('.force-alert')).not.toBeVisible();
    <%= namespace %>.utils.renderTimeoutBox();
    expect($('body').find('.force-alert')).toBeVisible();
  });

  it('#renderClearTimeoutBox window', function(){
    loadFixtures('timeout.html');
    <%= namespace %>.utils.renderClearTimeoutBox()
    expect($('body').find('.force-alert')).not.toBeVisible();
  });
});

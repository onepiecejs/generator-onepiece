<% var namespace = _.camelize(appname).toLowerCase(); %>
describe( "validate email address", function () {
  var checkEmail = <%= namespace %>.utils.checkEmail;

  it("It's a valid email address", function () {
    expect(checkEmail("example@redhat.com")).toBe(true);
  });

  it("It's an invalid email address", function () {
    expect(checkEmail("eaample@redhatcom")).toBe(false);
  });
});
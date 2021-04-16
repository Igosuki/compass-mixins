var render = require('../helper/render');
var ruleset = require('../helper/ruleset');

describe("Experimentel PIE support", function () {

  it("should not prefix linear-gradient with -pie-", function (done) {
    render(ruleset('@include background(linear-gradient(to right, white, black));'), function(output, err) {
      expect(output).toBe(ruleset('background:-owg-linear-gradient(to right, white, black);background:-webkit-linear-gradient(to right, white, black);background:-moz-linear-gradient(to right, white, black);background:-o-linear-gradient(to right, white, black);-pie-background:linear-gradient(to right, white, black);background:linear-gradient(to right, white, black)'));
      done();
    }, ['compass/css3/pie', 'compass/css3/images']);
  });
});

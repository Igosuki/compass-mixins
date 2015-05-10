var render = require('../helper/render');

describe("Should use prefix support function", function () {

  it("should return a boolean for a browser prefix", function (done) {
    render("should-use-prefix('android');", function(output, err) {
      expect(output).toBe("true");
      done();
    }, ['compass/functions/support']);
  });

});

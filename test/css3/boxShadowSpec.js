var render = require('../helper/render');
var ruleset = require('../helper/ruleset');

describe("CSS3 Box Shadow", function () {

  it("should generate a default box shadow", function (done) {
    render(ruleset('$default-box-shadow-inset: inset; $default-box-shadow-h-offset: 23px; $default-box-shadow-v-offset: 24px; $default-box-shadow-blur: 17px; $default-box-shadow-spread: 15px; $default-box-shadow-color: #DEADBE; $experimental-support-for-mozilla: false; $experimental-support-for-opera: false; @include box-shadow'), function(output, err) {
      expect(output).toBe(ruleset('-webkit-box-shadow:inset 23px 24px 17px 15px #DEADBE;box-shadow:inset 23px 24px 17px 15px #DEADBE'));
      done();
    }, ['compass/css3/box-shadow']);
  });

});

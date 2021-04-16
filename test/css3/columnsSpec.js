var render = require('../helper/render');
var ruleset = require('../helper/ruleset');

describe("CSS3 Columns", function () {

    it("should generate column-span properties with value: `none`", function (done) {
        var input = '@include column-span(none);',
            expectation = '-webkit-column-span:none;-moz-column-span:none;-ms-column-span:none;-o-column-span:none;column-span:none';

        render(ruleset(input), function(output, err) {
            expect(output).toBe(ruleset(expectation));
            done();
        }, ['compass/css3/columns']);
    });

    it("should generate column-span properties with value: `all`", function (done) {
        var input = '@include column-span(all);',
            expectation = '-webkit-column-span:all;-moz-column-span:all;-ms-column-span:all;-o-column-span:all;column-span:all';

        render(ruleset(input), function(output, err) {
            expect(output).toBe(ruleset(expectation));
            done();
        }, ['compass/css3/columns']);
    });

    it("should generate column-span properties with invalid value", function (done) {
        var input = '@include column-span(3);',
            expectation = '-webkit-column-span:3;-moz-column-span:3;-ms-column-span:3;-o-column-span:3;column-span:3';

        render(ruleset(input), function(output, err) {
            expect(output).toBe(ruleset(expectation));
            done();
        }, ['compass/css3/columns']);
    });

});

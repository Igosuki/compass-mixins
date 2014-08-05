var sass = require('node-sass');
var chalk = require('chalk');

describe("Imports", function () {
  it("should import all the provided files without an error", function (done) {
    var success = jasmine.createSpy('ImportSuccess');

    function complete() {
      expect(success).toHaveBeenCalled();
      done();
    }

    sass.render({
      file: __dirname + "/imports.scss",
      success: function(s){
        success();
        complete();
      },
      error: function(e){
        complete();
        console.log(chalk.red("Sass error:"), e);
      }
    });
  });
});
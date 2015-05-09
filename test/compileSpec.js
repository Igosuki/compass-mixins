var sass = require('node-sass');
var chalk = require('chalk');

describe("Imports", function () {
  it("should import all the provided files without an error", function (done) {
    var success = jasmine.createSpy('ImportSuccess');

    function complete() {
      expect(success).toHaveBeenCalled();
      done();
    }

    ["imports", "imports_animation"].forEach(function(importFile) {
      sass.render({
        file: __dirname + "/" + importFile,
      }, function(err, result) {
        if(err != undefined) {
          console.log(chalk.red("Sass error:"), err);
        } else {
          success();
        }
        complete();
      });
    });

  });
});

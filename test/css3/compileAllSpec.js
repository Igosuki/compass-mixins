var sass = require('node-sass');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

describe('test1', function()  {
    it('should pass this test', function()  {
        expect(true).toEqual(true);
    });
});

var css3Path = path.join(__dirname, "..", "..", "lib", "compass", "css3");
fs.readdir(css3Path.toString(), function(err, files) {
  files.forEach(function(file) {

    describe(file, function () {
      it("should import without an error", (function(file) {
        return function (done) {
          var success = jasmine.createSpy('ImportSuccess');

          function complete() {
            expect(success).toHaveBeenCalled();
            done();
          }

          sass.render({
            file: file,
          }, function(err, result) {
            if(err != undefined) {
              console.log(chalk.red("Sass error:"), err);
            } else {
              success();
            }
            complete();
          });
        }
      })(path.join(css3Path, file).toString()));
    });
  });
});

var sass = require('node-sass');
var chalk = require('chalk');

var libDir = __dirname.replace(/test$/, 'lib');

var render = function(data, callback) {
  sass.render({
    data: '@import "'+libDir+'/compass/functions";' + data,
    outputStyle: 'compressed',
    success: function(output){
      callback(output);
    },
    error: function(err){
      console.log(chalk.red("Sass error:"), err);
      callback('', err);
    }
  });
}

var property = function(prop) {
  return 'a{b:'+prop+';}';
}

describe("List Functions", function () {

  // This is verifying a function that's part of libsass that Compass also provided.
  it("should compact a list with false values", function (done) {
    render(property('compact(one,false,three)'), function(output, err) {
      expect(output).toBe(property('one,three'));
      done();
    });
  });

  it("should calculate a list length", function(done) {
    render('$list: one, two;' + property('-compass-list-size($list)'), function(output, err) {
      expect(output).toBe(property('2'));
      done();
    });
  });

  it("should calculate a list length with a space delimiter", function(done) {
    render('$list: one two;' + property('-compass-list-size($list)'), function(output, err) {
      expect(output).toBe(property('2'));
      done();
    });
  });

  it("should slice a list", function(done) {
    render('$list: one, two, three, four;' + property('-compass-slice($list, 2, 3)'), function(output, err) {
      expect(output).toBe(property('two,three'));
      done();
    });
  });

  it("should slice a list to the end", function(done) {
    render('$list: one, two, three, four;' + property('-compass-slice($list, 2)'), function(output, err) {
      expect(output).toBe(property('two,three,four'));
      done();
    });
  });

  it("should reject values from a list", function(done) {
    render('$list: one, two, three, four;' + property('reject($list, two, four)'), function(output, err) {
      expect(output).toBe(property('one,three'));
      done();
    });
  });

});

describe("Cross Browser Functions", function () {

  it("should prefix a property", function(done) {
    render(property('prefix(-webkit, x)'), function(output, err) {
      expect(output).toBe(property('-webkit-x'));
      done();
    });
  });

  it("should prefix a list of properties", function(done) {
    render(property('prefix(-webkit, x, y, z)'), function(output, err) {
      expect(output).toBe(property('-webkit-x,-webkit-y,-webkit-z'));
      done();
    });
  });

  it("should prefix a list of complex properties", function(done) {
    render(property('prefix(-webkit, linear-gradient(-45deg, rgb(0,0,0) 25%, transparent 75%, transparent), linear-gradient(-45deg, #000 25%, transparent 75%, transparent))'), function(output, err) {
      expect(output).toBe(property('-webkit-linear-gradient(-45deg, #000000 25%, transparent 75%, transparent),-webkit-linear-gradient(-45deg, #000 25%, transparent 75%, transparent)'));
      done();
    });
  });

});

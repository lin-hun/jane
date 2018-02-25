var babel = require("babel-core");
var fs = require('fs')
babel.transformFile("./es6.js", {minified:true}, function (err, result) {
  console.log(result.code)
});
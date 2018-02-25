let path = require('path')

module.exports = {
  log:require('./log'),
  getVer(){
    let pkg = path.join(__dirname,'../package.json')
    return require(pkg).version
  }
}

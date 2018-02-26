let Path = require('path')
let fs = require('fs-extra')


module.exports = {
  log:require('./log'),
  getVer(){
    let pkg = Path.join(__dirname,'../package.json')
    return require(pkg).version
  },
  getProjectConfig(){
    let config = Path.resolve('./jane.config.js')
    if(!fs.existsSync(config)){
      return false
    }
    return require(config)
  },
  write(){
    // rewrite
    return fs.outputFile.apply(this,arguments)
  },
  getOutputFile(str){
    return str.replace('src',this.getProjectConfig().dest)
  }
}

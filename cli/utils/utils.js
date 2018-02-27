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
  getProjectPkg(){
    let config = Path.resolve('./package.json')
    if(!fs.existsSync(config)){
      return false
    }
    return require(config)
  },
  getDistPath(){
    return this.getProjectConfig().dest || 'build'
  },
  getSrcPath(){
    return this.getProjectConfig().src || 'src'
  },
  write(){
    // rewrite
    return fs.outputFile.apply(this,arguments)
  },
  getOutputFile(str){
    str = str.replace('node_modules','npm')
    return str.replace('src',this.getProjectConfig().dest)
  }
}

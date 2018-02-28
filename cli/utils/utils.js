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
  getModulesPath(){
    return 'node_modules'
  },
  write(){
    // rewrite
    return fs.outputFile.apply(this,arguments)
  },
  getOutputFile(str){
    let dest = this.getDistPath()
    let src = this.getSrcPath()
    let modules = this.getModulesPath()
    if(str.indexOf(modules)>-1){
      str = `${dest}/${str}`
    }
    str = str.replace(modules,'npm')
    return str.replace(src,dest)
  }
}

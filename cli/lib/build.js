let fs = require('fs-extra')
let Path = require('path')
let jsCompile = require('./compiler/compile-js')
let cssCompile = require('./compiler/compile-css')
let utils = require('../utils/utils')
let log = utils.log
let projectConfig = utils.getProjectConfig()

function ignoreMatch(target) {
  let result = false
  utils.getProjectConfig().ignore.find((v)=>{
    if(v===Path.parse(target).base){
      result = true
    }
  })
  return result
}

function walk(target) {
  // ignore check
  if(ignoreMatch(target)){
    return
  }
  if (fs.lstatSync(target).isFile()) {
    if (Path.extname(target) === (projectConfig.css.ext||'.css')) {
      cssCompile(target)
    }
    else if(Path.extname(target) === (projectConfig.js.ext||'.js')) {
      jsCompile(target)
    }
    else {
      // copy
      let destPath = utils.getOutputFile(target)
      fs.copy(target,destPath)
      log.tag('复制文件',`${destPath}`)
    }
    return
  }
  if (fs.lstatSync(target).isDirectory()) {
    fs.readdirSync(target).forEach(v => {
      walk(Path.join(target, v))
    })
  }
}

if (!utils.getProjectConfig()) {
  log.error('未检测到配置文件，无法编译')
  return
}
if (process.versions.node < '8.0.0') {
  log.error('当前node版本较低，请升级您的node至最新版本')
  return
}
walk('src')

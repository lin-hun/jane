let chokidar = require('chokidar')
let Path = require('path')
let utils = require('../utils/utils')
let projectConfig = utils.getProjectConfig()
let log = utils.log
let jsCompiler = require('./compiler/compile-js')
let cssCompiler = require('./compiler/compile-css')

log.tag('监听文件变动中')
// analyse scss & js dependence before watch
let sassGraph = require('sass-graph')
let cssTree = sassGraph.parseDir('./src').index

function cssAnylase(path){
  let absolutePath = Path.resolve(path)
  if(cssTree[absolutePath]){
    let r = cssTree[absolutePath].importedBy
    r.push(absolutePath)
    return r
  }
  return [absolutePath]
}

function jsAnylase(path){
  let absolutePath = Path.resolve(path)
  return [absolutePath]
}

// todo js dependence analyse
let watcher = chokidar.watch('./src')
watcher.on('change', path => {
  let ext = Path.extname(path)
  if (ext === projectConfig.css.ext) {
    cssAnylase(path).forEach((v)=>{
      cssCompiler(v)
    })
  }
  else if (ext === projectConfig.js.ext) {
    jsAnylase(path).forEach(v=>{
      jsCompiler(v)
    })
  }
})
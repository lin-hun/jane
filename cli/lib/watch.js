let chokidar = require('chokidar')
let Path = require('path')
let projectConfig = require('../utils/utils')
let jsCompiler = require('./compiler/compile-js')
let cssCompiler = require('./compiler/compile-css')

// analyse scss & js dependence before watch
let sassGraph = require('sass-graph')
let result = sassGraph.parseDir('./scss')
// todo js dependence analyse
let watcher = chokidar.watch('./src')
watcher.on('change',path=>{
  let ext = Path.extname(path)
  if(ext===projectConfig.css.ext){
    cssCompiler(path)
  }
  else if(ext===projectConfig.js.ext){
    jsCompiler(path)
  }

})
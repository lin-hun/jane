// compile scss/less

// solve npm require

// copy to build dir
let fs = require('fs')
let path = require('path')
let jsCompile = require('./compile-js')
let cssCompile = require('./compile-css')

function ignoreMatch(target){

}

function walk(target){
  if(fs.lstatSync(target).isFile()){
    // ignore files in config.js
    if('css'){
      cssCompile(target)
    }
    if('js'){
      jsCompile(target)
    }
    else{
      // copy
    }
    return
  }
  if(fs.lstatSync(target).isDirectory()){
    fs.readdirSync(target).forEach(v=>{
      walk(path.join(target,v))
    })
  }
}
walk(path.join(__dirname,'../../cli'))

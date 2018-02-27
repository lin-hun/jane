let fs = require('fs-extra')
let Path = require('path')
let utils = require('../../utils/utils')
let log = utils.log
let modulesDir = 'node_modules'
let compile = require('./compile-js')

function existInPkg(lib){
  let pkg = utils.getProjectPkg()
  let libs = Object.assign(pkg.devDependencies,pkg.dependencies)
  return libs[lib]
}
function findMainJs(modules){
  let pkg = require(Path.resolve(`${modulesDir}/${modules}/package.json`))
  let main = pkg.main||'./index.js'
  return Path.resolve(`${modulesDir}/${modules}/${main}`)
}

module.exports = (code,isModules)=>{
  code.replace(/require\(['"]([\w\d_\-\.\/\@]+)['"]\)/ig,(match,lib)=>{
    if(Path.isAbsolute(lib)){
      // if path in src directory => solve
      // require('/user/work/project/a.js')
      let absoluteSrc = Path.join(__dirname,utils.getSrcPath())
      let absoluteDist = Path.join(__dirname,utils.getDistPath())
      if(lib.indexOf(absoluteSrc)===0){
        lib = lib.replace(absoluteSrc,absoluteDist)
      }
    }
    else if(lib[0]==='.'){
      // require('./utils/test')
      // todo
      if(isModules){
        compile(`${modulesDir}/lib`)
      }

    }
    else if(lib.indexOf('/') === -1||lib.indexOf('/') === lib.length - 1 ){
      // npm
      // require('babel-present-env')
      // todo require('babel-core/index')
      if(!existInPkg(lib)){
        log.error(`未能够在package.json里找到${lib},请确认配置是否正确`)
      }
      if(!fs.existsSync(`${modulesDir}/${lib}`)){
        log.error(`未能够在${modulesDir}里找到${lib},请确认是否安装`)
      }
      let main = findMainJs(lib)
      if(!fs.existsSync(main)){
        log.error(`${main}不存在，请确认是否安装`)
      }
      // ismodules
      compile(main,true)
    }
    log.info(lib)
    return lib
  })
}
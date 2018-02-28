let babel = require('babel-core')
let fs = require('fs')
let utils = require('../../utils/utils')
let config = utils.getProjectConfig().js.config
let log = utils.log
let Path = require('path')
let modulesDir = 'node_modules'

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

function analyse(code,from){
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
      if(from.indexOf('node_modules')>-1){
        compiler(`${modulesDir}/lib`)
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
      log.info(main)
      // replace 'babel-core' => ./npm
      // todo path replace on node_module & src

      // let relative = Path.relative('src',)
      // lib = lib.replace()
      // ismodules
      compiler(main)
    }
    log.info(lib)
    return lib
  })
}
function compiler(path){
  babel.transformFile(path,config, (err, result) => {
    if (err) {
      log.error(err)
      return
    }
    analyse(result.code,path)
    // compile to .js
    path = utils.getOutputFile(path)
    // write in
    utils.write(path, result.code).then(v => {
      log.tag('写入',`${utils.getOutputFile(path)}`)
    }).catch((err) => {
      log.error(err)
    })
  })
}
module.exports = compiler

let cmd = require('child_process').execSync;
let log = require('../utils/log')
// create project
function createDir(name){
  log.info(`创建文件夹...`)
  try{
    cmd(`mkdir ${name}`)
  }
  catch(err){
    log.info('创建目录失败')
  }

}
// copy tpl
function copy(name) {
  log.info(`创建示例...`)
}
// install dependence
function install(name){
  log.info(`安装依赖...`)
}

module.exports = (name)=>{
  createDir(name)
  copy(name)
  install(name)
}
let cmd = require('child_process').execSync
let log = require('../utils/log')
let fs = require('fs')
let fse = require('fs-extra')
let path = require('path')

module.exports = async (name)=>{
    try{
      fs.mkdirSync(name)
      log.info('创建目录成功')
    }
    catch(err){
      log.error('创建目录失败')
      return
    }
    try{
      // copy
      console.log(path.resolve())
      await fse.copy('../tpl/',path.resolve(`${name}/tpl`))
      log.info(`创建示例成功`)
    }
    catch(err){
      log.error('创建示例失败')
      return
    }
    // npm install
    log.info(`安装依赖中`)
    cmd("npm install",{stdio:[0,1,2]})

}
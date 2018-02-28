let cmd = require('child_process').execSync
let utils = require('../utils/utils')
let log = utils.log
let fs = require('fs-extra')
let Path = require('path')
let project = utils.getProjectConfig()
module.exports = async (name) => {
  try {
    let path = Path.join(__dirname, '../tpl/page')
    // custom page dir
    if(project.tpl&&project.tpl.page){
      path = Path.resolve(project.tpl.page)
      if(!utils.isDir(path)){
        log.error(`${project.tpl.page}不是文件夹，无法创建`)
        return
      }
    }
    // copy tpl/project
    if (fs.existsSync(path)) {
      log.error(`创建失败，${name}目录已存在`)
      return
    }
    await fs.copy(path, Path.resolve(`src/pages/${name}`))
    log.info(`创建页面成功`)
  }
  catch (err) {
    console.log(err)
    log.error('创建页面失败')
    return
  }
}
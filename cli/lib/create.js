let cmd = require('child_process').execSync
let log = require('../utils/utils').log
let fs = require('fs')
let fse = require('fs-extra')
let path = require('path')

module.exports = async (name) => {
  try {
    // copy
    if (fs.existsSync(name)) {
      log.error('创建失败，目录已存在')
      return
    }
    await fse.copy(path.join(__dirname, '../tpl/project'), path.resolve(`${name}`))
    log.info(`创建目录成功`)
  }
  catch (err) {
    log.error('创建目录失败')
    return
  }
  // npm install
  log.info(`安装依赖中...`)
  cmd(`cd ${path.resolve(name)};pwd; npm install`, {stdio: [0, 1, 2]})

}
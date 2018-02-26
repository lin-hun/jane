let cmd = require('child_process').execSync
let log = require('../utils/utils').log
let fs = require('fs-extra')
let Path = require('path')

module.exports = async (name) => {
  try {
    // copy tpl/project
    if (fs.existsSync(name)) {
      log.error('创建失败，目录已存在')
      return
    }
    await fs.copy(Path.join(__dirname, '../tpl/project'), Path.resolve(`${name}`))

    // write package.json
    let pkgPath = Path.resolve(`${name}/package.json`)
    let pkg = require(pkgPath)
    pkg.name = name
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4))

    //
    log.info(`创建目录成功`)
  }
  catch (err) {
    console.log(err)
    log.error('创建目录失败')
    return
  }
  // npm install
  log.info(`安装依赖中...`)
  cmd(`cd ${Path.resolve(name)};pwd; npm install`, {stdio: [0, 1, 2]})

}
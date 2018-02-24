let chalk = require('chalk')
let color = {
  error:chalk.bold.red,
  info:chalk.bold.grey,
  warn:chalk.keyword('orange')
}
function log(){
  let D = new Date()
  let arr = [D.getHours(),D.getMinutes(),D.getSeconds()].map((v)=>{
    if(v<10){
      return `0${v}`
    }
    return v
  })
  let r = Array.prototype.slice.call(arguments)
  r.unshift(chalk.grey(`[${arr.join(':')}]`))
  console.log.apply(this,r)
}

module.exports = {
  info(){
    log.apply(this,arguments)
  },
  warn(){
    log.apply(this,color.warn(arguments))
  },
  error(){
    log.apply(this,color.error(arguments))
  }
}
let chalk = require('chalk')
let color = {
  error:chalk.red,
  info:chalk.grey,
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

function custom(){

}
module.exports = {
  tag(tag){
    let r = Array.prototype.slice.call(arguments)
    r[0] = chalk.green(r[0])
    log.apply(this,r)
  },
  info(){
    log.apply(this,arguments)
  },
  warn(){
    let r = Array.prototype.slice.call(arguments)
    let arr = r.map(v=>{
      return color.warn(v)
    })
    log.apply(this,arr)
  },
  error(){
    let r = Array.prototype.slice.call(arguments)
    let arr = r.map(v=>{
      return color.error(v)
    })
    log.apply(this,arr)
  }
}
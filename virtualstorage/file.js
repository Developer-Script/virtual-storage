const pth = require ('path')
const fs = require ('fs')

class FILE
{
  constructor (path)
  {
    if (path) this.map (path)

    if (typeof (require(this.PATH)) == "function") this.CONTENT = require (this.PATH)
  }

  map (path)
  {
    this.NAME = pth.parse (path).name
    this.BASE = pth.parse (path).base
    this.DIR = pth.parse (path).dir
    this.ROOT = pth.parse (path).root
    this.EXT = pth.parse(path).ext
    this.PATH = `${this.DIR}/${this.BASE}`
    this.SIZE = fs.lstatSync (path).size
  }

  getContent (path)
  {
    console.log (path)
    return require (`"${path}"`)
  }
}
module.exports = FILE

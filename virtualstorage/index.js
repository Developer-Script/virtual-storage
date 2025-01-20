class STORAGE
{
  #driveMod = require (`${__dirname}/drive.js`)

  map (prop)
  {
    if (prop)
    {
      const temp = {}
      if (prop.tag) temp.tag = prop.tag
      if (prop.path) temp.path = prop.path

      if (temp.path)
      {
        if (!(this.DIR_COUNT)) this.DIR_COUNT = 0
        if (!(this.DIRECTORY)) this.DIRECTORY = []
            
        this.DIRECTORY.push (new this.#driveMod (temp))
        this.DIR_COUNT = this.DIRECTORY.length
      }
    }
  }

  query (prop)
  {
    let result = "PENDING"

    if (this.DIRECTORY.length)
    {
      result = this.DIRECTORY
    }

    if (Object.keys (prop).length >= 1)
    {
      for (let x in prop)
      {
        if (x.toUpperCase () == "DIRECTORY") result = this.getDirectory (prop.directory, result)
      }

    }

    return result
  }

  getDirectory (qDir, vDir)
  {
    if (typeof(qDir) == "object")
    {
      if (Object.keys (qDir).length == 0)
      {
        
      }
    }
  }
}
module.exports = STORAGE

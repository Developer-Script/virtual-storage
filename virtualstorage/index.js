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
    if (prop)
    {
      if (!(this.QUERY_COUNT)) this.QUERY_COUNT = 0
      this.QUERY_COUNT ++

      if (!(this.QUERY)) this.QUERY = []
      this.QUERY[this.QUERY_COUNT] = {}

      const drive = this.queryDrive (prop.drive)

      console.log (drive)
    
      return this.QUERY[this.QUERY_COUNT]
    }
  }

  queryDrive (drive)
  {
    let dirKeys
    

    if (this.DIRECTORY)
    {
      
    }

    return dirKeys
  }
}
module.exports = STORAGE

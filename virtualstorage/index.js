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
      //if prop obj has data, proceed.
      
    }
    else
    {
      //if prop obj has no data, do not proceed.
      console.log ("Error: No data entered.")
    }
  }
}
module.exports = STORAGE

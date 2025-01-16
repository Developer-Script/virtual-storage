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
      let Results
      if (prop.directory) Results = this.getDirectory (prop.directory)
      
      return Results || "Pending Query"
    }
    else
    {
      //if prop obj has no data, do not proceed.
      console.log ("Error: No data entered.")
    }
  }

  getDirectory (idir)
  {
    let Results
    let idirCount = Object.keys (idir).length

    if (idirCount == 0) Results = this.DIRECTORY

    if (idir)
    {
      for (let xx in this.DIRECTORY)
      {
        Results = this.setKeys (idir, idirCount, xx, this.DIRECTORY[xx])
      }
    }
    return Results || "Pending Drive Selection" 
  }

  setKeys (idir, idirCount, oindex, directory)
  {
    let Results = []
    let okeys = []
    let ikeys = []
    let iomatch = []

    for (let yy in directory)
    {
      okeys.push (yy)
    }

    for (let zz in idir)
    {
      ikeys.push (zz.toUpperCase ())
    }

    for (let x in ikeys)
    {
      for (let z in okeys)
      {
        if (ikeys[x] == okeys[z])
        {
          iomatch.push (ikeys[x])
        }
      }
    }

    console.log (iomatch)

    //Results.push (iomatch)

    return Results || "Pending Key Comparision."
  }
}
module.exports = STORAGE

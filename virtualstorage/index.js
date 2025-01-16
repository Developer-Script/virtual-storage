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
      let Results = []
      if (prop.directory)
      {
        const result = this.getDirectory (prop.directory)

        for (let yz in result)
        {
          if (result[yz] != null)
          {
            Results.push (result[yz])
          }
        }
      }

      if (prop.folder) Results = this.getFolder (prop.folder)

      return Results || "Pending Query"
    }
  }

  getFolder (ifol)
  {

  }

  getDirectory (idir)
  {
    let Results = []

    if (idir)
    {
      for (let xx in this.DIRECTORY)
      {
        Results.push (this.setKeys (idir, xx, this.DIRECTORY[xx]))
      }
    }

    return Results || null
  }

  setKeys (idir, oindex, directory)
  {
    let Results
    let okeys = []
    let ikeys = []
    let iomatch = []
    let iovals = []

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

    if (iomatch.length == ikeys.length)
    {
      for (let dd in iomatch)
      {
        if (idir[(iomatch[dd]).toLowerCase ()] == directory[iomatch[dd]])
        {
          iovals.push (directory[iomatch[dd]])
        }
      }
    }
 
    if (iovals.length == iomatch.length)
    {
      Results = directory
    }

    return Results || null
  }
}
module.exports = STORAGE

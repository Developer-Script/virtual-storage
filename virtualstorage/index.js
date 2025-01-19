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
          else Results = null
        }
      }

      if (prop.folder) 
      {
        const result = this.getFolderFromDir (prop.folder, Results)
        
        for (let yz in result)
        {
          if (result[yz] != null)
          {
            Results = null
            Results = []
            Results.push (result[yz])
          }
          else Results = null
        }
      }

      return Results
    }
  }

  getFolderFromDir (ifol, directory)
  {
    let Results = []

    let ifolCount = Object.keys(ifol).length
    let dirCount = directory.length
    
    for (let aa in directory)
    {
      Results.push (this.searchFolder (ifol, directory[aa]))
    }

    return Results
  }

  searchFolder (ifol, directory)
  {
    let Results = []

    Results = this.recur (directory, ifol, Results)

    return Results
  }

  recur (directory, ifol, arr)
  {
    if (directory.FOLDERS)
    {
      let ifoldKeys = []
      let iomatch = []
      let ioCount = 0
      let ifoldCount = Object.keys (ifol).length

      for (let ww in ifol)
      {
        ifoldKeys.push (ww.toUpperCase ())
      }

      for (let qq in directory.FOLDERS)
      { 
        for (let aa in directory.FOLDERS[qq])
        {
          for (let bb in ifoldKeys)
          {
            if (aa == ifoldKeys[bb])
            {
              iomatch.push (aa)
            }
          }
        }

        ioCount = iomatch.length

        if (ioCount == ifoldCount)
        {
          arr = this.setValues (directory.FOLDERS[qq].NAME, ifol)
        }

        this.recur (directory.FOLDERS[qq], ifol, arr)
      }
    }

    return arr
  }

  setValues (match, ifol)
  {
    //console.log (match)

    return match
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

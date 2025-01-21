class STORAGE
{
  #driveMod = require (`${__dirname}/drive.js`)

  map (prop)
  {
    if (prop)
    {
      const temp = {}
      if (prop.tag) temp.tag = prop.tag
      if (prop.password) temp.password = prop.password
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

    if (typeof (prop) != "object") result = "Error: Variable is not an Object";
    else if (Object.keys (prop).length >= 1)
    {
      for (let x in prop)
      {
        if (x.toUpperCase () == "DIRECTORY") result = this.getDirectory (prop.directory, this.DIRECTORY);
      }
    }
    else if (Object.keys (prop).length == 0) result = "Error: ";

    return result
  }

  getDirectory (qDir, vDir)
  {
    let result = []

    if (typeof(qDir) != "object") result = "Error: Directory variable is not an Object.";
    else if (Object.keys (qDir).length >= 1)
    {
      for (let index in vDir) result.push (this.getDirKeys(qDir, vDir[index]));
    }
    else if (Object.keys (qDir).length == 0) result = "Error: No data entered to specify directory";

    return result
  }

  getDirKeys (qDir, vDirIndi)
  {
    let result = []
    let qDirKeys = []
    let vPassword = false
    let qPassword = false
    let matchVals = []

    for (let keys in qDir)
    {
      qDirKeys.push (keys.toUpperCase ())
    }

    for (let index in qDirKeys)
    {
      if (qDirKeys[index] == "PASSWORD")
      {
        qPassword = true
      }
      
      for (let keys in vDirIndi)
      {
        if (keys == "PASSWORD")
        {
          vPassword = true
        }

        if (qDirKeys[index] == keys && qDir[qDirKeys[index].toLowerCase ()] == vDirIndi[keys])
        { 
          matchVals.push (vDirIndi[keys])
        }
      } 
    }

    if (vPassword && qPassword)
    {
      console.log ("P & P")
      console.log (vDirIndi.NAME, vPassword, qPassword)
    }
    

    return result
  }
}
module.exports = STORAGE

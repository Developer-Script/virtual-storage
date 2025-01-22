class STORAGE
{
  #driveMod = require (`${__dirname}/drive.js`)

  map (prop)
  {
    if (prop)
    {
      const temp = {}
      if (prop.tag) temp.tag = prop.tag
      if (prop.username) temp.username = prop.username
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
    let qDirSet = false

    if (typeof (prop) != "object") result = "Error: Variable is not an Object";
    else if (Object.keys (prop).length >= 1)
    {
      for (let x in prop)
      {
        if (x.toUpperCase () == "DIRECTORY")
        {
          result = this.getDirectory (prop[x], this.DIRECTORY);
          qDirSet = true
        }
        
        if (x.toUpperCase () == "FOLDER" && qDirSet)
        {
          result = this.getFolder (prop[x], result)
        }

        if (x.toUpperCase () == "FILE" && qDirSet)
        {
          result = this.getFile (prop[x], result)
        }
      }
    }
    else if (Object.keys (prop).length == 0) result = "Error: No data entered.";

    if (!(qDirSet)) result = "Error: Directory data is not provided."

    return result
  }

  getFile (qFil, vFol)
  {
    let result = []
    let res = []

    if (typeof(qFil) != "object") result = "Error: File variable is not an Object.";
    else if (Object.keys (qFil).length == 0) result = "Error: No data entered to specify File";
    else if (Object.keys (qFil).length >= 1)
    {
      for (let index in vFol) res.push (this.getFilLoop(qFil, vFol[index].FILES));
    }

    for (let index in res)
    {
      for (let index2 in res[index])
      {
        if (res[index][index2] != null) result.push (res[index][index2]);
      }
    }

    return result
  }

  getFolder (qFol, vFol)
  {
    let result = []
    let res = []

    if (typeof(qFol) != "object") result = "Error: Folder variable is not an Object.";
    else if (Object.keys (qFol).length == 0) result = "Error: No data entered to specify Folder";
    else if (Object.keys (qFol).length >= 1)
    {
      for (let index in vFol) res.push (this.getFolLoop(qFol, vFol[index].FOLDERS));
    }

    for (let index in res)
    {
      for (let index2 in res[index])
      {
        if (res[index][index2] != null) result.push (res[index][index2]);
      }
    }

    return result
  }

  getFilLoop (qFol, obj, newResult)
  {
    let result = []

    if (newResult) result = newResult
    
    for (let z in obj)
    {
      result.push (this.getFolKeys (qFol, obj[z]))

      this.getFilLoop (qFol, obj[z].FILES, result)
    }

    return result
  }

  getFolLoop (qFol, obj, newResult)
  {
    let result = []

    if (newResult) result = newResult
    
    for (let z in obj)
    {
      result.push (this.getFolKeys (qFol, obj[z]))

      this.getFolLoop (qFol, obj[z].FOLDERS, result)
    }

    return result
  }

  getFolKeys (qFol, obj)
  {
    let qFolKeys = []
    let matchVals = []

    
    for (let keys in qFol)
    {
      qFolKeys.push (keys.toUpperCase ())
    }

    for (let index in qFolKeys)
    {    
      for (let keys in obj)
      {
        if (qFolKeys[index] == keys && qFol[qFolKeys[index].toLowerCase ()] == obj[keys]) matchVals.push (obj[keys]);
      }
      
    }

    if (qFolKeys.length >= matchVals.length && matchVals.length >= 1) return obj;
    else return null;
  }

  getDirectory (qDir, vDir)
  {
    let result = []
    let res = []

    if (typeof(qDir) != "object") result = "Error: Directory variable is not an Object.";
    else if (Object.keys (qDir).length >= 1)
    {
      for (let index in vDir) res.push (this.getDirKeys(qDir, vDir[index]));
    }
    else if (Object.keys (qDir).length == 0) result = "Error: No data entered to specify directory";

    for (let index in res)
    {
      if (res[index] != null) result.push (res[index]);
    }

    return result
  }

  getDirKeys (qDir, vDirIndi)
  {
    
    let qDirKeys = []
    let vPassword = false
    let qPassword = false
    let vUsername = false
    let qUsername = false
    let matchVals = []

    for (let keys in qDir)
    {
      qDirKeys.push (keys.toUpperCase ())
    }

    for (let index in qDirKeys)
    {
      if (qDirKeys[index].toUpperCase () == "PASSWORD") qPassword = true;
      if (qDirKeys[index].toUpperCase () == "USERNAME") qUsername = true;
      
      for (let keys in vDirIndi)
      {
        if (keys.toUpperCase () == "PASSWORD") vPassword = true;
        if (keys.toUpperCase () == "USERNAME") vUsername = true;

        if (qDirKeys[index] == keys && qDir[qDirKeys[index].toLowerCase ()] == vDirIndi[keys]) matchVals.push (vDirIndi[keys]);
      } 
    }

    if (vPassword == qPassword && vUsername == qUsername && qDirKeys.length >= matchVals.length && matchVals.length >= 2) return vDirIndi;
    else return null;
  }
}
module.exports = STORAGE

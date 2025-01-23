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
    let qFilSet = false
    let newProp

    if (typeof (prop) != "object") result = "Error: Variable is not an Object";
    else if (Object.keys (prop).length >= 1)
    {
      newProp = this.capLoop (prop)

       for (let x in newProp)
      {
        if (x == "DIRECTORY")
        {
          result = this.getDirectory (newProp[x], this.DIRECTORY);
          qDirSet = true
        }
        
        if (x == "FOLDER" && qDirSet)
        {
          result = this.getFolder (newProp[x], result)
        }

        if (x == "FILE" && qDirSet)
        {
          result = this.getFile (newProp[x], result)
          qFilSet = true
        }

        if (x == "GET" && qDirSet && !qFilSet)
        {
          result = this.getVals (newProp[x], result)
        }
        else if (x == "GET" && qDirSet && qFilSet)
        {
          result = this.getValsV2 (newProp[x], result)
        }
      }
    }
    else if (Object.keys (prop).length == 0) result = "Error: No data entered.";

    if (!(qDirSet)) result = "Error: Directory data is not provided."

    return result
  }

  getValsV2 (qGet, obj)
  {
    let result = []
    let res = []

    if (typeof (qGet) != "object") result = "Error: Getter variable is not an Array.";
    else if (Object.keys(qGet).length == 0) result = "Error: No data entered to specify Getter";
    else if (Object.keys(qGet).length >= 1)
    {
      result.push (this.getKeys2 (qGet, obj))
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

  getKeys2 (qGet, obj)
  {
    let result = []
    let newqGet = []

    for (let x in qGet)
    {
      newqGet.push (qGet[x].toUpperCase ())
    }

    for (let index in obj)
    {
      result.push (this.setGetVals (newqGet, obj[index]))
    }

    return result
  }

  setGetVals (qGet, obj)
  { 
    let result = {}

    for (let key in obj)
    {
      for (let index in qGet)
      {
        if (key == qGet[index])
        {
          result[key] = obj[key]
        }
      }
    }

    return result
  }

  getVals (qGet, obj)
  {
    let result = []
    let res = []

    if (typeof (qGet) != "object") result = "Error: Getter variable is not an Array.";
    else if (Object.keys(qGet).length == 0) result = "Error: No data entered to specify Getter";
    else if (Object.keys(qGet).length >= 1)
    {
      result.push (this.getVals2 (qGet, obj))
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

  getVals2 (qGet, obj)
  {
    let result = []
    let newqGet = []

    for (let z in qGet)
    {
      newqGet.push (qGet[z].toUpperCase ())
    }

    for (let x in obj)
    {
      result.push (this.getLoop (newqGet, obj[x]))
    }

    return result
  }

  getLoop (qGet, obj, loop)
  {
    let result = []

    if (loop) result = loop

    for (let d in obj.FILES)
    {
      result.push (this.getKeys (qGet, obj.FILES[d]))
    }

    for (let c in obj.FOLDERS)
    {
      result.push (this.getKeys (qGet, obj.FOLDERS[c]))

      this.getLoop (qGet, obj.FOLDERS[c], result)
    }

    return result
  }

  getKeys (qGet, obj)
  {
    let result = {}

    for (let key in obj)
    {
      for (let index in qGet)
      {
        if (key == qGet[index])
        {
          result[key] = obj[key]
        }
      }
    }

    return result
  }

  capLoop (obj, loop)
  {
    let result = {}

    if (loop) result = loop


    for (let b in obj)
    {
      result[b.toUpperCase ()] = obj[b]

      if (typeof(obj[b]) == "object")
      {
        result[b.toUpperCase ()] = {}

        this.capLoop (obj[b], result[b.toUpperCase ()])
      }
      
    }

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
      for (let index in vFol) res.push (this.getFilLoop(qFil, vFol[index]));
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

  getFilLoop (qFil, obj, newResult)
  {
    let result = []

    if (newResult) result = newResult

    for (let a in obj.FILES)
    {
      result.push (this.getFilKeys (qFil, obj.FILES[a]))
    }
    
    for (let z in obj.FOLDERS)
    {      
      this.getFilLoop (qFil, obj.FOLDERS[z], result)
    }

    return result
  }

  getFilKeys (qFil, obj)
  {
    let qFilKeys = []
    let matchVals = []

    
    for (let keys in qFil)
    {
      qFilKeys.push (keys)
    }

    for (let index in qFilKeys)
    {
      for (let keys in obj)
      {
        if (qFilKeys[index] == keys && qFil[qFilKeys[index]] == obj[keys]) matchVals.push (obj[keys]);
      }
      
    }

    if (qFilKeys.length >= matchVals.length && matchVals.length >= 1) return obj;
    else return null;
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
      qFolKeys.push (keys)
    }

    for (let index in qFolKeys)
    {    
      for (let keys in obj)
      {
        if (qFolKeys[index] == keys && qFol[qFolKeys[index]] == obj[keys]) matchVals.push (obj[keys]);
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
      qDirKeys.push (keys)
    }

    for (let index in qDirKeys)
    {
      if (qDirKeys[index] == "PASSWORD") qPassword = true;
      if (qDirKeys[index] == "USERNAME") qUsername = true;
      
      for (let keys in vDirIndi)
      {
        if (keys == "PASSWORD") vPassword = true;
        if (keys == "USERNAME") vUsername = true;

        if (qDirKeys[index] == keys && qDir[qDirKeys[index]] == vDirIndi[keys]) matchVals.push (vDirIndi[keys]);
      } 
    }

    if (vPassword == qPassword && vUsername == qUsername && qDirKeys.length >= matchVals.length && matchVals.length >= 3) return vDirIndi;
    else return null;
  }
}
module.exports = STORAGE

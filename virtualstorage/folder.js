const pth = require ('path')
const fs = require ('fs')

class FOLDER
{
  NAME
  DIR
  ROOT
  PATH
  SIZE

  map
  getContent
  setFolders
  setFiles
  
  constructor (path, map, getContent, setFolders, setFiles)
  {
    if (map) this.map = map
    if (getContent) this.getContent = getContent
    if (setFolders) this.setFolders = setFolders
    if (setFiles) this.setFiles = setFiles

    if (path) this.map (path)
  }
}
module.exports = FOLDER

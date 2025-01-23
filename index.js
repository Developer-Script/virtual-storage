const VS = require (`${__dirname}/virtualstorage`)
const vs = new VS

vs.map (
{
  tag : "C:",
  username : "Moon",
  password : "Clean.12",
  path : `${__dirname}/test`
})


vs.map (
{
  tag : "D:",
  username : "Moon",
  password : "Clean.12",
  path : `${__dirname}/virtualstorage`
})


const core = vs.query (
{
  directORY :
  {
    tAg : "D:",
    username : "Moon",
    password : "Clean.12"
  },
  file :
  {
    ext : ".js"
  },
  get : ['name', 'content', 'dir', 'root']
})

console.dir (core, {depth: 5})

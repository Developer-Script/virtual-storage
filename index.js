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
  tag : "C:",
  username : "Moon",
  password : "Clean.12",
  path : `${__dirname}/virtualstorage`
})


const core = vs.query (
{
  directORY :
  {
    tag : "F:",
    username : "Moon",
    password : "Clean.12"
  },
  folder :
  {
    name : "fold",
    root : "/"
  },
  file :
  {
    name : "index"
  }
})

console.dir (core, {depth: 2})

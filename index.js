const VS = require (`${__dirname}/virtualstorage`)
const vs = new VS

vs.map (
{
  tag : "C:",
  password : "Clean.12",
  path : `${__dirname}/test`
})


vs.map (
{
  tag : "C:",
  //password : "Clean.12",
  path : `${__dirname}/virtualstorage`
})


const core = vs.query (
{
  directory :
  {
    tag : "C:",
    password : "Clean.12", 
    //root : "/"
  }
})

console.dir (core, {depth: 4})

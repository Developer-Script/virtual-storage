const VS = require (`${__dirname}/virtualstorage`)
const vs = new VS

vs.map (
{
  tag : "C:",
  path : `${__dirname}/test`
})


vs.map (
{
  tag : "D:",
  path : `${__dirname}/virtualstorage`
})


const core = vs.query (
{
  drive :
  {
    tag : "C:",
    name : "virtualstorage",
    test : "messy"
  }
})

console.dir (core, {depth: 7})

const VS = require (`${__dirname}/virtualstorage`)
const vs = new VS

vs.map (
{
  tag : "D:",
  path : `${__dirname}/test`
})


vs.map (
{
  tag : "C:",
  path : `${__dirname}/virtualstorage`
})


const core = vs.query (
{
  directory :
  {
    tag : "C:",
  },
  folder :
  {
  }
})

console.dir (core, {depth: 2})

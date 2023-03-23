const core = require('@actions/core')
const fs = require('fs')

const options = {
  dir: core.getInput('path'),
  from: core.getInput('from'),
  to: core.getInput("to"),
  default: {
    from: [ 'jggveuruoh.execute-api.us-east-1.amazonaws.com', '"Stage: "test"', '"Stage: "prod"'],
    to: ['${ApiEndpoint}', '"Stage: "${stage}"', '"Stage: "${stage}"']
  }
}

function run() {
  try {
    // if(options.from.length!=options.to.length){
    //   core.notice('input mismatch')
    //   options.to=options.default.to
    //   options.from=options.default.from
    // }
    const files = fs.readdirSync(options.dir, (f)=>{
      core.notice(f)
      return f.filter(x=>{
        core.notice(`x: ${x}`)
        x.indexOf('json')>-1})
    });
    core.notice(json.stringify(files))
    files.map(x=>{
        core.notice(x);
       let txt = fs.readFileSync(x);
       options.from.map((r,i) => {
          let arr = txt.split(r)
          let txt = txt.join(to[i])       
          core.notice(`${r} ${arr.length} replacement of ${to[i]}`)          
       })
       core.notice('writing file')
       fs.writeFileSync(x, txt)     
    });
    core.setOutput(`success`)
  } catch (error) {
    core.notice(`Error occurred: ${error}${JSON.stringify(error)}`)
  }
}

run()

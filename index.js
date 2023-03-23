const core = require('@actions/core')
const fs = require('fs')

const options = {
  dir: JSON.parse(core.getInput('path')),
  from: JSON.parse(core.getInput('from')),
  to: JSON.parse(core.getInput("to")),
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
      return f.filter(x=>x.indexOf('json')>-1)
    });
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
  } catch {
    core.notice(`Error occurred: ${error}${JSON.stringify(error)}`)
  }
}

run()

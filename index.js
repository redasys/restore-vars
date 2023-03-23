const core = require('@actions/core')
const fs = require('fs')

const options = {
  dir: JSON.parse(core.getInput('path')),
  from: JSON.parse(core.getInput('from')),
  to: JSON.parse(core.getInput("to"));
  
  // from: /jggveuruoh.execute-api.us-east-1.amazonaws.com/g,
  // to: '${ApiEndpoint}'
}

function run() {
  try {
    const files = fs.readdirSync(options.dir, (f)=>{
      return f.filter(x=>x.indexOf('json')>-1)
    });
    files.map(x=>{
        core.notice(x);
       let txt = fs.readFileSync(x);
       options.from.map((r,i){
          let arr = txt.split(from[i]);
          let txt = txt.join(to[i]);          
          core.notice(`${from[i]}: ${arr.length} replacement of ${to[i]}`)
       })
       core.notice('writing file')
       fs.writeFileSync(x, txt)     
    });
  } catch {
    core.notice(`Error occurred: ${error}${JSON.stringify(error)}`)
  }
}

run()

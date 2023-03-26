const core = require('@actions/core')
const fs = require('fs')

const options = {
  dir: core.getInput('path'),
  from: core.getInput('from'),
  to: core.getInput("to"),
  default: {
    dir: `deploy/StepFunctions`,
    from: ['jggveuruoh.execute-api.us-east-1.amazonaws.com', '"Stage": "prod"', '"Stage": "test"', 'QA_', 'PROD_'],
    to: ['${ApiEndpoint}', '"Stage": "${stage}"', '"Stage": "${stage}"', '${environment}', '${environment}']
  }
}

function run() {
  core.notice('starting')
  try {
    if (!options.from.length || options.from.length != options.to.length) {
      core.notice('input mismatch loading defaults')
      options.dir = options.default.dir
      options.to = options.default.to
      options.from = options.default.from
    }
    core.notice(options.from)

    const files = fs.readdirSync(options.dir, (f) => {
      core.notice(f)
      return f.filter(x => {
        core.notice(`x: ${x}`)
        return x.indexOf('json') > -1
      })
    });
    core.notice(files)

    files.map(x => {
      core.notice(x);
      let txt = fs.readFileSync(`${options.dir}/${x}`, 'utf8')

      const jsn = txt

      core.notice(jsn.substr(0, 100))

      options.from.map((r, i) => {
        core.notice(`from: ${r} to: ${options.to[i]}`)
        let arr = jsn.split(r)
        if (arr.length === 1) {
          core.notice("search string not found. No need to change");
          return;
        }

        txt = arr.join(` ${options.to[i]} `)
        core.notice(x)
        core.notice(`${r} ${arr.length} replacement of ${r}`)
      })

      core.notice('writing file')
      fs.writeFileSync(`${options.dir}/${x}`, txt)
      //}, 2000)
    })

    core.setOutput(`success`)
  } catch (error) {
    core.notice(`Error occurred: ${error}${JSON.stringify(error)}`)
  }
}


run()

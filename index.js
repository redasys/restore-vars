const core = require('@actions/core')
const replaceInFiles = require('replace-in-files');

const options = {
  files: '',
  from: /jggveuruoh.execute-api.us-east-1.amazonaws.com/g,
  to: '${ApiEndpoint}'
}

function run() {
  try {
    options.files = core.getInput('path-to-watch');
    options.from = from: /jggveuruoh.execute-api.us-east-1.amazonaws.com/g
    core.notice(options.files);
    replaceInFiles(options)
      .then(({ changedFiles, countOfMatchesByPaths }) => {
        core.notice(`Modified files:, ${JSON.stringify(changedFiles)}`);
        core.setOutput(`changedFiles, ${JSON.stringify(changedFiles)}`)
        core.notice(`countOfMatchesByPaths, ${JSON.stringify(countOfMatchesByPaths)}`);
        core.setOutput(`countOfMatchesByPaths, ${JSON.stringify(countOfMatchesByPaths)}`)
        core.notice(`options, ${JSON.stringify(options)}`);
        core.setOutput("options", options);

      })
    // .catch(error => {
    //   core.notice(`Error occurred: ${error}${error.toString()}`);
    // });
  } catch {
    core.notice(`Error occurred: ${error}${JSON.stringify(error)}`);
  }
  options.from = '"Stage": "Test"';
  options.to = '"Stage": "${stage}"';
  core.notice(`options: ${options}`);
  try {
    replaceInFiles(options)
      .then(({ changedFiles, countOfMatchesByPaths }) => {
        core.notice(`Modified files:, ${JSON.stringify(changedFiles)}`);
        core.setOutput(`changedFiles, ${JSON.stringify(changedFiles)}`)
        core.notice(`countOfMatchesByPaths, ${JSON.stringify(countOfMatchesByPaths)}`);
        core.setOutput(`countOfMatchesByPaths, ${JSON.stringify(countOfMatchesByPaths)}`)
        core.notice(`options, ${JSON.stringify(options)}`);
        core.setOutput("options", options);

      })
    // .catch(error => {
    //   core.notice(`Error occurred: ${error}${error.toString()}`);
    // });
  } catch {
    core.notice(`Error occurred: ${error}${JSON.stringify(error)}`);
  }
}

run()

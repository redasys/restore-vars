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
    core.notice(options.files);
    replaceInFiles(options)
      .then(({ changedFiles, countOfMatchesByPaths }) => {
        core.notice(`Modified files:, ${changedFiles}`);
        core.setOutput(`changedFiles, ${changedFiles}`)
        core.notice(`countOfMatchesByPaths, ${countOfMatchesByPaths}`);
        core.setOutput(`countOfMatchesByPaths, ${countOfMatchesByPaths}`)
        core.notice(`options, ${JSON.stringify(options)}`);
        core.setOutput("options", options);

      })
    // .catch(error => {
    //   core.notice(`Error occurred: ${error}${error.toString()}`);
    // });
  } catch {
    core.notice(`Error occurred: ${error}${error.toString()}`);
  }
  options.from = /"Stage": "Test"/g;
  options.to = '"Stage": "${stage}"';
  core.notice(`options: ${options}`);
  try {
    replaceInFiles(options)
      .then(({ changedFiles, countOfMatchesByPaths }) => {
        core.notice('Modified files:', changedFiles);
        core.setOutput("changedFiles", changedFiles)
        core.notice('countOfMatchesByPaths', countOfMatchesByPaths);
        core.setOutput("countOfMatchesByPaths", countOfMatchesByPaths)
        core.notice('options', options);
        core.setOutput("options", options)
      })
    // .catch(error => {
    //   core.notice('Error occurred:', error);
    // });
  } catch {
    core.notice(`Error occurred: ${error}${error.toString()}`);
  }
}

run()

#!/usr/bin/env node

const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');
var colors = require('colors');

// The first argument will be the project name.
const projectName = process.argv[2];

// Create a project directory with the project name.
const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);

console.log('\n*********************************************'.brightGreen);
console.log("Start creating the project:" + ` ${projectName}`.bold.blue)

// Check if the directory already exists
if (!fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir, { recursive: true });

  // All file templates must be organized in a single directory
  const templateDir = path.resolve(__dirname, 'template');
  fs.cpSync(templateDir, projectDir, { recursive: true });

  // Manage the dotfiles in the project target directory
  fs.renameSync(
    path.join(projectDir, 'gitignore'),
    path.join(projectDir, '.gitignore')
  );

  const projectPackageJson = require(path.join(projectDir, 'package.json'));

  // Update the project's package.json with the new project name
  projectPackageJson.name = projectName;

  process.chdir(projectDir)

  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(projectPackageJson, null, 2)
  );

  // Run `npm install` in the project directory to install
  // the dependencies using a third-party library
  // called `cross-spawn` for cross-platform support.
  // (Node has issues spawning child processes in Windows).
  spawn.sync('npm', ['install'], { stdio: 'inherit' });

  // *** Installation completed ***
  console.log('\n*********************************************'.brightGreen);
  console.log('******** Cloudinary NodeJS SDK Basic ********'.green);
  console.log(`Created ${projectName} at ${projectDir}`.gray);
  console.log('The installation has completed successfully!\n'.blue);
  console.log('> Update the parameters in file: ' + `./${projectName}/.env`.italic.bold.gray);
  console.log('> Launch application: ' + `node ./${projectName}/index.js`.italic.bold.gray);
  console.log('*********************************************\n'.brightGreen);

  process.chdir(currentDir)

} else {
  console.log(`Target directory: ${projectDir}`.gray);
  console.log('Directory already exists. Abort installation!\n'.yellow);
}

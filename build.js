const fsE = require('fs-extra');
const childProcess = require('child_process');

fsE.removeSync('./dist/');

fsE.copySync('./src/api', './dist/api');
fsE.copySync('./src/core', './dist/core');
fsE.copySync('./src/data-pg', './dist/data-pg');

childProcess.execSync('tsc --build tsconfig.prod.json');
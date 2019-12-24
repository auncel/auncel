/* --------------------------------------------------------------------------*
 * Filename: d:\Project\fe-oj\scripts\killChrome.js                          *
 * Path: d:\Project\fe-oj                                                    *
 * Created Date: Monday, December 23rd 2019, 10:20:40 pm                     *
 * Author: yidafu(dov-yih)                                                   *
 *                                                                           *
 * Copyright (c) 2019 None                                                   *
 *-------------------------------------------------------------------------- */
const childProcess = require('child_process');

const { exec, execSync } = childProcess;

execSync('ps -A | grep chrome')
  .toString()
  .split('\n')
  .map(line => line.slice(0, line.indexOf(' ')))
  .forEach(pid => exec(`kill ${pid}`));

console.log(execSync('ps -A | grep chrome').toString());

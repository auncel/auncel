const { execSync } = require('child_process');
const { join } = require('path');
const { green } = require('chalk');
const pkgs = [
  'common',
  'diff-dom-core',
  'diff-pixel-core',
  'diff-service',
  'client-web',
];

/**
 * 建立软连接
 *
 * @param {string[]} packageList
 * @param {string} baseDir 绝对路径
 */
function link(packageList, baseDir) {
  packageList.forEach((linkPkg) => {
    const linkDir = join(baseDir, linkPkg);
    console.log(green(`create link @feoj/${linkPkg}`));
    execSync(`cd ${linkDir} && yarn link && cd ${baseDir}`);
  });

  packageList.forEach((pkg) => {
    packageList.forEach((targetPkg) => {
      if (pkg !== targetPkg) {
        const targetDir = join(baseDir, targetPkg);
        console.log(green(`link @feoj/${pkg} to @feoj/${targetPkg}`));
        execSync(`cd ${targetDir} && yarn link '@feoj/${pkg}' && cd ${baseDir}`);
      }
    });
  });
}

link(pkgs, join(__dirname, '../packages/'));

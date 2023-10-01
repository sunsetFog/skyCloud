
const fs = require('fs');
function copyWay(source, target) {
    fs.unlink(target, () => {
      fs.copyFile(source, target, (err) => {
        if (err) throw err;
        console.log('Copy completed!');
      });
    });
}

copyWay('./vue.config.js', './packages/adminSystem/vue.config.js');
copyWay('./vue.config.js', './packages/pcWebsite/vue.config.js');
copyWay('./vue.config.js', './packages/mobileApp/vue.config.js');

copyWay('./.gitignore', './packages/adminSystem/.gitignore');
copyWay('./.gitignore', './packages/pcWebsite/.gitignore');
copyWay('./.gitignore', './packages/mobileApp/.gitignore');

copyWay('./.editorconfig', './packages/adminSystem/.editorconfig');
copyWay('./.editorconfig', './packages/pcWebsite/.editorconfig');
copyWay('./.editorconfig', './packages/mobileApp/.editorconfig');

copyWay('./.prettierignore', './packages/adminSystem/.prettierignore');
copyWay('./.prettierignore', './packages/pcWebsite/.prettierignore');
copyWay('./.prettierignore', './packages/mobileApp/.prettierignore');

copyWay('./tsconfig.json', './packages/adminSystem/tsconfig.json');
copyWay('./tsconfig.json', './packages/pcWebsite/tsconfig.json');
copyWay('./tsconfig.json', './packages/mobileApp/tsconfig.json');

copyWay('./.stylelintignore', './packages/adminSystem/.stylelintignore');
copyWay('./.stylelintignore', './packages/pcWebsite/.stylelintignore');
copyWay('./.stylelintignore', './packages/mobileApp/.stylelintignore');

copyWay('./stylelint.config.js', './packages/adminSystem/stylelint.config.js');
copyWay('./stylelint.config.js', './packages/pcWebsite/stylelint.config.js');
copyWay('./stylelint.config.js', './packages/mobileApp/stylelint.config.js');

copyWay('./.npmrc', './packages/adminSystem/.npmrc');
copyWay('./.npmrc', './packages/pcWebsite/.npmrc');
copyWay('./.npmrc', './packages/mobileApp/.npmrc');

copyWay('./.eslintignore', './packages/adminSystem/.eslintignore');
copyWay('./.eslintignore', './packages/pcWebsite/.eslintignore');
copyWay('./.eslintignore', './packages/mobileApp/.eslintignore');

// copyWay('./docker', './packages/adminSystem/docker');
// copyWay('./docker', './packages/pcWebsite/docker');
// copyWay('./docker', './packages/mobileApp/docker');





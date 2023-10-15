
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
copyWay('./.gitignore', './packages/mobxSky/.gitignore');

copyWay('./.editorconfig', './packages/adminSystem/.editorconfig');
copyWay('./.editorconfig', './packages/pcWebsite/.editorconfig');
copyWay('./.editorconfig', './packages/mobileApp/.editorconfig');
copyWay('./.editorconfig', './packages/mobxSky/.editorconfig');

copyWay('./.prettierignore', './packages/adminSystem/.prettierignore');
copyWay('./.prettierignore', './packages/pcWebsite/.prettierignore');
copyWay('./.prettierignore', './packages/mobileApp/.prettierignore');
copyWay('./.prettierignore', './packages/mobxSky/.prettierignore');

copyWay('./tsconfig.json', './packages/adminSystem/tsconfig.json');
copyWay('./tsconfig.json', './packages/pcWebsite/tsconfig.json');
copyWay('./tsconfig.json', './packages/mobileApp/tsconfig.json');
copyWay('./tsconfig.json', './packages/mobxSky/tsconfig.json');

copyWay('./.stylelintignore', './packages/adminSystem/.stylelintignore');
copyWay('./.stylelintignore', './packages/pcWebsite/.stylelintignore');
copyWay('./.stylelintignore', './packages/mobileApp/.stylelintignore');
copyWay('./.stylelintignore', './packages/mobxSky/.stylelintignore');

copyWay('./.stylelintrc.js', './packages/adminSystem/.stylelintrc.js');
copyWay('./.stylelintrc.js', './packages/pcWebsite/.stylelintrc.js');
copyWay('./.stylelintrc.js', './packages/mobileApp/.stylelintrc.js');
copyWay('./.stylelintrc.js', './packages/mobxSky/.stylelintrc.js');

copyWay('./.npmrc', './packages/adminSystem/.npmrc');
copyWay('./.npmrc', './packages/pcWebsite/.npmrc');
copyWay('./.npmrc', './packages/mobileApp/.npmrc');
copyWay('./.npmrc', './packages/mobxSky/.npmrc');

copyWay('./.eslintignore', './packages/adminSystem/.eslintignore');
copyWay('./.eslintignore', './packages/pcWebsite/.eslintignore');
copyWay('./.eslintignore', './packages/mobileApp/.eslintignore');
copyWay('./.eslintignore', './packages/mobxSky/.eslintignore');

copyWay('./.eslintrc.js', './packages/adminSystem/.eslintrc.js');
copyWay('./.eslintrc.js', './packages/pcWebsite/.eslintrc.js');
copyWay('./.eslintrc.js', './packages/mobileApp/.eslintrc.js');
// copyWay('./.eslintrc.js', './packages/mobxSky/.eslintrc.js');

copyWay('./.postcssrc.js', './packages/mobileApp/.postcssrc.js');
copyWay('./postcss.config.js', './packages/mobileApp/postcss.config.js');
// copyWay('./postcss.config.js', './packages/mobxSky/postcss.config.js');

// copyWay('./babel.config.js', './packages/mobileApp/babel.config.js');
// copyWay('./.babelrc.js', './packages/mobxSky/.babelrc.js');

// copyWay('./docker', './packages/adminSystem/docker');
// copyWay('./docker', './packages/pcWebsite/docker');
// copyWay('./docker', './packages/mobileApp/docker');





const fs = require('fs');
const path = require('path');
function copyWay1(source, target) {
    try {
        fs.unlinkSync(target);
    } catch (err) {
        console.log('Delete failed!');
    }

    try {
        fs.copyFileSync(source, target);
        console.log('Copy completed!');
    } catch (err) {
        console.log('Copy failed!');
    }
}

function copyDir(srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true });
    const files = fs.readdirSync(srcDir);

    for (let file of files) {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);

        const stat = fs.statSync(srcPath);

        if (stat.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function copyWay2(source, target) {
    try {
        fs.rmSync(target, { recursive: true });
    } catch (err) {
        console.log('Delete failed!');
    }

    try {
        copyDir(source, target);
        console.log('Copy completed!');
    } catch (err) {
        console.log('Copy failed!');
    }
}

copyWay1('./vue.config.js', './packages/rafaelAdmin/vue.config.js');
copyWay1('./vue.config.js', './packages/rafaelClientWeb/vue.config.js');
copyWay1('./vue.config.js', './packages/rafaelClientApp/vue.config.js');

copyWay1('./.gitignore', './packages/rafaelAdmin/.gitignore');
copyWay1('./.gitignore', './packages/rafaelClientWeb/.gitignore');
copyWay1('./.gitignore', './packages/rafaelClientApp/.gitignore');
copyWay1('./.gitignore', './packages/ivoryAdmin/.gitignore');
copyWay1('./.gitignore', './packages/ivoryClientH5/.gitignore');
copyWay1('./.gitignore', './packages/ivoryClientWeb/.gitignore');

copyWay1('./.editorconfig', './packages/rafaelAdmin/.editorconfig');
copyWay1('./.editorconfig', './packages/rafaelClientWeb/.editorconfig');
copyWay1('./.editorconfig', './packages/rafaelClientApp/.editorconfig');
copyWay1('./.editorconfig', './packages/ivoryAdmin/.editorconfig');

copyWay1('./.prettierignore', './packages/rafaelAdmin/.prettierignore');
copyWay1('./.prettierignore', './packages/rafaelClientWeb/.prettierignore');
copyWay1('./.prettierignore', './packages/rafaelClientApp/.prettierignore');
copyWay1('./.prettierignore', './packages/ivoryAdmin/.prettierignore');

copyWay1('./tsconfig.json', './packages/rafaelAdmin/tsconfig.json');
copyWay1('./tsconfig.json', './packages/rafaelClientWeb/tsconfig.json');
copyWay1('./tsconfig.json', './packages/rafaelClientApp/tsconfig.json');
copyWay1('./tsconfig.json', './packages/ivoryAdmin/tsconfig.json');
copyWay1('./tsconfig.json', './packages/ivoryClientH5/tsconfig.json');

copyWay1('./.stylelintignore', './packages/rafaelAdmin/.stylelintignore');
copyWay1('./.stylelintignore', './packages/rafaelClientWeb/.stylelintignore');
copyWay1('./.stylelintignore', './packages/rafaelClientApp/.stylelintignore');
copyWay1('./.stylelintignore', './packages/ivoryAdmin/.stylelintignore');

copyWay1('./.stylelintrc.js', './packages/rafaelAdmin/.stylelintrc.js');
copyWay1('./.stylelintrc.js', './packages/rafaelClientWeb/.stylelintrc.js');
copyWay1('./.stylelintrc.js', './packages/rafaelClientApp/.stylelintrc.js');
copyWay1('./.stylelintrc.js', './packages/ivoryAdmin/.stylelintrc.js');

copyWay1('./.npmrc', './packages/rafaelAdmin/.npmrc');
copyWay1('./.npmrc', './packages/rafaelClientWeb/.npmrc');
copyWay1('./.npmrc', './packages/rafaelClientApp/.npmrc');
copyWay1('./.npmrc', './packages/ivoryAdmin/.npmrc');

copyWay1('./.eslintignore', './packages/rafaelAdmin/.eslintignore');
copyWay1('./.eslintignore', './packages/rafaelClientWeb/.eslintignore');
copyWay1('./.eslintignore', './packages/rafaelClientApp/.eslintignore');
copyWay1('./.eslintignore', './packages/ivoryAdmin/.eslintignore');
copyWay1('./.eslintignore', './packages/ivoryClientH5/.eslintignore');

copyWay1('./.eslintrc.js', './packages/rafaelAdmin/.eslintrc.js');
copyWay1('./.eslintrc.js', './packages/rafaelClientWeb/.eslintrc.js');
copyWay1('./.eslintrc.js', './packages/rafaelClientApp/.eslintrc.js');
// copyWay1('./.eslintrc.js', './packages/ivoryAdmin/.eslintrc.js');

copyWay1('./.postcssrc.js', './packages/rafaelClientApp/.postcssrc.js');
copyWay1('./postcss.config.js', './packages/rafaelClientApp/postcss.config.js');
// copyWay1('./postcss.config.js', './packages/ivoryAdmin/postcss.config.js');

// copyWay1('./babel.config.js', './packages/rafaelClientApp/babel.config.js');
// copyWay1('./.babelrc.js', './packages/ivoryAdmin/.babelrc.js');

// copyWay2('./docker', './packages/rafaelAdmin/docker');
// copyWay2('./docker', './packages/rafaelClientWeb/docker');
// copyWay2('./docker', './packages/rafaelClientApp/docker');

copyWay2('./ivoryDesign', './packages/ivoryAdmin/src/@energy/ivoryDesign');
copyWay2('./ivoryDesign', './packages/ivoryClientH5/src/@energy/ivoryDesign');
copyWay2('./ivoryDesign', './packages/ivoryClientWeb/src/@energy/ivoryDesign');
copyWay2('./styles', './packages/ivoryAdmin/src/@energy/styles');
copyWay2('./styles', './packages/ivoryClientH5/src/@energy/styles');
copyWay2('./styles', './packages/ivoryClientWeb/src/@energy/styles');

copyWay1('./rafaelDesign/static/favicon.ico', './packages/rafaelAdmin/public/favicon.ico');
copyWay1('./rafaelDesign/static/favicon.ico', './packages/rafaelClientWeb/public/favicon.ico');
copyWay1('./rafaelDesign/static/favicon.ico', './packages/rafaelClientApp/public/favicon.ico');

copyWay2('./image', './packages/ivoryClientH5/src/@energy/image');

copyWay2('./tools', './packages/ivoryAdmin/src/@energy/tools');
copyWay2('./tools', './packages/ivoryClientH5/src/@energy/tools');
copyWay2('./tools', './packages/ivoryClientWeb/src/@energy/tools');

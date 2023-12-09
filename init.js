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

copyWay1('./vue.config.js', './packages/adminSystem/vue.config.js');
copyWay1('./vue.config.js', './packages/pcWebsite/vue.config.js');
copyWay1('./vue.config.js', './packages/mobileApp/vue.config.js');

copyWay1('./.gitignore', './packages/adminSystem/.gitignore');
copyWay1('./.gitignore', './packages/pcWebsite/.gitignore');
copyWay1('./.gitignore', './packages/mobileApp/.gitignore');
copyWay1('./.gitignore', './packages/mobxSky/.gitignore');

copyWay1('./.editorconfig', './packages/adminSystem/.editorconfig');
copyWay1('./.editorconfig', './packages/pcWebsite/.editorconfig');
copyWay1('./.editorconfig', './packages/mobileApp/.editorconfig');
copyWay1('./.editorconfig', './packages/mobxSky/.editorconfig');

copyWay1('./.prettierignore', './packages/adminSystem/.prettierignore');
copyWay1('./.prettierignore', './packages/pcWebsite/.prettierignore');
copyWay1('./.prettierignore', './packages/mobileApp/.prettierignore');
copyWay1('./.prettierignore', './packages/mobxSky/.prettierignore');

copyWay1('./tsconfig.json', './packages/adminSystem/tsconfig.json');
copyWay1('./tsconfig.json', './packages/pcWebsite/tsconfig.json');
copyWay1('./tsconfig.json', './packages/mobileApp/tsconfig.json');
copyWay1('./tsconfig.json', './packages/mobxSky/tsconfig.json');

copyWay1('./.stylelintignore', './packages/adminSystem/.stylelintignore');
copyWay1('./.stylelintignore', './packages/pcWebsite/.stylelintignore');
copyWay1('./.stylelintignore', './packages/mobileApp/.stylelintignore');
copyWay1('./.stylelintignore', './packages/mobxSky/.stylelintignore');

copyWay1('./.stylelintrc.js', './packages/adminSystem/.stylelintrc.js');
copyWay1('./.stylelintrc.js', './packages/pcWebsite/.stylelintrc.js');
copyWay1('./.stylelintrc.js', './packages/mobileApp/.stylelintrc.js');
copyWay1('./.stylelintrc.js', './packages/mobxSky/.stylelintrc.js');

copyWay1('./.npmrc', './packages/adminSystem/.npmrc');
copyWay1('./.npmrc', './packages/pcWebsite/.npmrc');
copyWay1('./.npmrc', './packages/mobileApp/.npmrc');
copyWay1('./.npmrc', './packages/mobxSky/.npmrc');

copyWay1('./.eslintignore', './packages/adminSystem/.eslintignore');
copyWay1('./.eslintignore', './packages/pcWebsite/.eslintignore');
copyWay1('./.eslintignore', './packages/mobileApp/.eslintignore');
copyWay1('./.eslintignore', './packages/mobxSky/.eslintignore');

copyWay1('./.eslintrc.js', './packages/adminSystem/.eslintrc.js');
copyWay1('./.eslintrc.js', './packages/pcWebsite/.eslintrc.js');
copyWay1('./.eslintrc.js', './packages/mobileApp/.eslintrc.js');
// copyWay1('./.eslintrc.js', './packages/mobxSky/.eslintrc.js');

copyWay1('./.postcssrc.js', './packages/mobileApp/.postcssrc.js');
copyWay1('./postcss.config.js', './packages/mobileApp/postcss.config.js');
// copyWay1('./postcss.config.js', './packages/mobxSky/postcss.config.js');

// copyWay1('./babel.config.js', './packages/mobileApp/babel.config.js');
// copyWay1('./.babelrc.js', './packages/mobxSky/.babelrc.js');

// copyWay2('./docker', './packages/adminSystem/docker');
// copyWay2('./docker', './packages/pcWebsite/docker');
// copyWay2('./docker', './packages/mobileApp/docker');

copyWay2('./@higherOrder', './packages/mobxSky/src/@energy/@higherOrder');
copyWay2('./@library', './packages/mobxSky/src/@energy/@library');
copyWay2('./@appDesign', './packages/mobxSky/src/@energy/@appDesign');
copyWay2('./@pcDesign', './packages/mobxSky/src/@energy/@pcDesign');
copyWay2('./@utils', './packages/mobxSky/src/@energy/@utils');
copyWay2('./styles', './packages/mobxSky/src/@energy/styles');

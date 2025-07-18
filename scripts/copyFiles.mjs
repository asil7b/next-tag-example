import path from 'path';
import fse from 'fs-extra';
import glob from 'fast-glob';

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './dist');
const srcPath = path.join(packagePath, './src');

async function includeFileInBuild(file) {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fse.copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

async function createModulePackages({ from, to }) {
  const directoryPackages = glob.sync('*/index.{js,jsx,ts,tsx}', { cwd: from }).map(path.dirname);
  await Promise.all(
    directoryPackages.map(async (directoryPackage) => {
      const packageJsonPath = path.join(to, directoryPackage, 'package.json');

      const packageJson = {
        sideEffects: false,
        module: './index.js',
        main: path.posix.join('../cjs', directoryPackage, 'index.js'),
      };

      const [moduleEntryExists, mainEntryExists] = await Promise.all([
        fse.pathExists(path.resolve(path.dirname(packageJsonPath), packageJson.module)),
        fse.pathExists(path.resolve(path.dirname(packageJsonPath), packageJson.main)),
        fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2)),
      ]);

      const manifestErrorMessages = [];
      if (!moduleEntryExists) {
        manifestErrorMessages.push(`'module' entry '${packageJson.module}' does not exist`);
      }
      if (!mainEntryExists) {
        manifestErrorMessages.push(`'main' entry '${packageJson.main}' does not exist`);
      }
      if (manifestErrorMessages.length > 0) {
        // TODO: AggregateError
        throw new Error(`${packageJsonPath}:\n${manifestErrorMessages.join('\n')}`);
      }

      return packageJsonPath;
    }),
  );
}

async function createPackageFile() {
  const packageText = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const packageData = JSON.parse(packageText);
  delete packageData.scripts;
  delete packageData.devDependencies;

  const distPackageData = {
    ...packageData,
    private: false,
    main: './cjs/index.js',
    module: './index.js',
  };

  const targetPath = path.resolve(buildPath, './package.json');
  await fse.writeFile(targetPath, JSON.stringify(distPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${targetPath}`);

  return distPackageData;
}

async function run() {
  try {
    await createPackageFile();
    await Promise.all(
      [
        'changelog.md',
        'readme.md',
      ].map((file) => includeFileInBuild(file)),
    );
    await createModulePackages({ from: srcPath, to: buildPath });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();

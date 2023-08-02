import fs from 'fs-extra';
import path from 'path';

async function preparePackage() {
  const rootPackageJson = await fs.readJson(path.resolve('./package.json'));
  const projectPackageJsonPath = path.resolve('./dist/angular-tree-component/package.json');
  const projectPackageJson = await fs.readJson(projectPackageJsonPath);
  
  projectPackageJson.version = rootPackageJson.version;
  
  await fs.writeJson(projectPackageJsonPath, projectPackageJson, { spaces: 2 });
}

preparePackage();
module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies && pkg.dependencies['fast-uri']) {
        pkg.dependencies['fast-uri'] = '>=3.1.6';
      }
      if (pkg.devDependencies && pkg.devDependencies['fast-uri']) {
        pkg.devDependencies['fast-uri'] = '>=3.1.6';
      }
      if (pkg.dependencies && pkg.dependencies['sharp']) {
        pkg.dependencies['sharp'] = '>=0.35.4';
      }
      if (pkg.devDependencies && pkg.devDependencies['sharp']) {
        pkg.devDependencies['sharp'] = '>=0.35.4';
      }
      if (pkg.dependencies && pkg.dependencies['vitest']) {
        pkg.dependencies['vitest'] = '>=4.1.11';
      }
      if (pkg.devDependencies && pkg.devDependencies['vitest']) {
        pkg.devDependencies['vitest'] = '>=4.1.11';
      }
      if (pkg.dependencies && pkg.dependencies['@vitest/mocker']) {
        pkg.dependencies['@vitest/mocker'] = '>=4.1.11';
      }
      if (pkg.devDependencies && pkg.devDependencies['@vitest/mocker']) {
        pkg.devDependencies['@vitest/mocker'] = '>=4.1.11';
      }
      return pkg;
    }
  }
};

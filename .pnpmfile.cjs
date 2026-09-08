module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies && pkg.dependencies['fast-uri']) {
        pkg.dependencies['fast-uri'] = '3.1.6';
      }
      if (pkg.devDependencies && pkg.devDependencies['fast-uri']) {
        pkg.devDependencies['fast-uri'] = '3.1.6';
      }
      return pkg;
    }
  }
}

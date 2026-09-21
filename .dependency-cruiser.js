/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'warn',
      comment: 'This dependency is part of a circular relationship. You might want to revise your solution (i.e. use dependency inversion, make sure the modules have a single responsibility) ',
      from: {},
      to: { circular: true },
    },
    {
      name: 'not-to-unresolvable',
      comment: "This module depends on a module that cannot be found ('resolved').",
      severity: 'error',
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
    {
      name: 'no-orphans',
      comment: "This is an orphan module.",
      severity: 'info',
      from: {
        orphan: true,
        pathNot: [
          '(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$',
          '\\.d\\.ts$',
          '(^|/)tsconfig\\.json$',
          '(^|/)(babel|webpack)\\.config\\.(js|cjs|mjs|ts)$',
          '(^|/)\\.eslintrc\\.(js|cjs|mjs|ts|json)$',
          '(^|/)\\.prettierrc\\.(js|cjs|mjs|ts|json)$',
        ],
      },
      to: {},
    },
    {
      name: 'not-to-dev-dep',
      severity: 'error',
      comment: "This module depends on a devDependency.",
      from: {
        path: '^(src)',
        pathNot: '\\.(spec|test)\\.(js|mjs|cjs|ts|ls|coffee|litcoffee|coffee\\.md)$',
      },
      to: {
        dependencyTypes: [
          'npm-dev',
        ],
        pathNot: [
          'node_modules/@types/',
        ],
      },
    },
    {
      name: 'cross-package-boundary',
      severity: 'error',
      comment: "Cross-package imports are forbidden. Packages should not import from other packages directly unless strictly designed via API surface, and here we forbid cross-package imports (e.g. backend importing frontend).",
      from: {
        path: '^packages/([^/]+)/',
      },
      to: {
        path: '^packages/',
        pathNot: '^packages/$1/'
      }
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    includeOnly: '^(src|packages)',
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+',
      },
      archi: {
        collapsePattern: '^(packages|src|lib|app|bin|test(s?)|spec(s?))/[^/]+|node_modules/[^/]+',
      },
      text: {
        highlightFocused: true,
      },
    },
  },
};

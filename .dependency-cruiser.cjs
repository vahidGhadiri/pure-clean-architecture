/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    /* ──────────────────────────────────────────────────────────────────────
     *  CLEAN ARCHITECTURE — Layer boundary rules
     *
     *  Layers (inward → outward):
     *    domain → shared → application / infrastructure → composition → presentation
     *
     *  Dependency rule: outer layers may depend on inner layers, never the reverse.
     * ────────────────────────────────────────────────────────────────────── */

    // ── DOMAIN (innermost) ──────────────────────────────────────────────

    {
      to: {
        path: [
          '^src/shared(/|$)',
          '^src/application(/|$)',
          '^src/infrastructure(/|$)',
          '^src/composition(/|$)',
          '^src/presentation(/|$)',
          '^src/main[.]ts$',
        ],
      },
      comment: 'Domain layer is the innermost layer and must not depend on any other layer.',
      name: 'clean-domain-must-be-isolated',
      from: { path: '^src/domain(/|$)' },
      severity: 'error',
    },

    // ── SHARED ──────────────────────────────────────────────────────────

    {
      comment: 'Shared layer must not depend on application layer.',
      to: { path: '^src/application(/|$)' },
      name: 'clean-shared-no-application',
      from: { path: '^src/shared(/|$)' },
      severity: 'error',
    },
    {
      comment: 'Shared layer must not depend on infrastructure layer.',
      to: { path: '^src/infrastructure(/|$)' },
      name: 'clean-shared-no-infrastructure',
      from: { path: '^src/shared(/|$)' },
      severity: 'error',
    },
    {
      comment: 'Shared layer must not depend on composition layer.',
      to: { path: '^src/composition(/|$)' },
      name: 'clean-shared-no-composition',
      from: { path: '^src/shared(/|$)' },
      severity: 'error',
    },
    {
      comment: 'Shared layer must not depend on presentation layer.',
      to: { path: '^src/(presentation|main)[.]ts$' },
      name: 'clean-shared-no-presentation',
      from: { path: '^src/shared(/|$)' },
      severity: 'error',
    },

    // ── APPLICATION ─────────────────────────────────────────────────────

    {
      comment:
        'Application layer must not depend on infrastructure. ' +
        'Use dependency inversion: define interfaces in domain, inject implementations via composition.',
      name: 'clean-application-no-infrastructure',
      to: { path: '^src/infrastructure(/|$)' },
      from: { path: '^src/application(/|$)' },
      severity: 'error',
    },
    {
      comment: 'Application layer must not depend on composition layer.',
      name: 'clean-application-no-composition',
      from: { path: '^src/application(/|$)' },
      to: { path: '^src/composition(/|$)' },
      severity: 'error',
    },
    {
      comment: 'Application layer must not depend on presentation layer.',
      to: { path: '^src/(presentation|main)[.]ts$' },
      name: 'clean-application-no-presentation',
      from: { path: '^src/application(/|$)' },
      severity: 'error',
    },

    // ── INFRASTRUCTURE ──────────────────────────────────────────────────

    {
      comment: 'Infrastructure layer must not depend on application layer.',
      name: 'clean-infrastructure-no-application',
      from: { path: '^src/infrastructure(/|$)' },
      to: { path: '^src/application(/|$)' },
      severity: 'error',
    },
    {
      comment: 'Infrastructure layer must not depend on composition layer.',
      name: 'clean-infrastructure-no-composition',
      from: { path: '^src/infrastructure(/|$)' },
      to: { path: '^src/composition(/|$)' },
      severity: 'error',
    },
    {
      comment: 'Infrastructure layer must not depend on presentation layer.',
      to: { path: '^src/(presentation|main)[.]ts$' },
      name: 'clean-infrastructure-no-presentation',
      from: { path: '^src/infrastructure(/|$)' },
      severity: 'error',
    },

    // ── COMPOSITION ─────────────────────────────────────────────────────

    {
      comment: 'Composition must not depend on presentation layer.',
      to: { path: '^src/(presentation|main)[.]ts$' },
      name: 'clean-composition-no-presentation',
      from: { path: '^src/composition(/|$)' },
      severity: 'error',
    },

    // ── PRESENTATION ────────────────────────────────────────────────────

    {
      comment:
        'Presentation layer must not depend on infrastructure directly. ' +
        'Wire dependencies through the composition root instead.',
      from: { path: '^src/(presentation|main)[.]ts$' },
      name: 'clean-presentation-no-infrastructure',
      to: { path: '^src/infrastructure(/|$)' },
      severity: 'error',
    },
    {
      comment:
        'Presentation layer must not depend on application layer directly. ' +
        'Delegate to the composition root to access use cases.',
      from: { path: '^src/(presentation|main)[.]ts$' },
      name: 'clean-presentation-no-application',
      to: { path: '^src/application(/|$)' },
      severity: 'error',
    },

    /* ──────────────────────────────────────────────────────────────────────
     *  GENERAL QUALITY RULES
     * ────────────────────────────────────────────────────────────────────── */

    {
      comment:
        'This dependency is part of a circular relationship. ' +
        'Revise your solution (use dependency inversion, ensure single responsibility).',
      from: {
        pathNot: [
          // barrel index files are allowed in circular checks
          '(^|/)index[.]ts$',
        ],
      },
      to: {
        circular: true,
      },
      name: 'no-circular',
      severity: 'warn',
    },

    {
      from: {
        pathNot: [
          // config & declaration files
          '(^|/)[.][^/]+[.](?:js|cjs|mjs|ts|cts|mts|json)$',
          '[.]d[.]ts$',
          '(^|/)tsconfig[.]json$',
          '(^|/)(?:babel|webpack|dependency-cruiser)[.]config[.](?:js|cjs|mjs|ts|cts|mts|json)$',
        ],
        orphan: true,
      },
      comment: "This is an orphan module — it's likely not used (anymore?). " + 'Either use it or remove it.',
      name: 'no-orphans',
      severity: 'warn',
      to: {},
    },

    {
      to: {
        path: [
          '^v8/tools/codemap$',
          '^v8/tools/consarray$',
          '^v8/tools/csvparser$',
          '^v8/tools/logreader$',
          '^v8/tools/profile_view$',
          '^v8/tools/profile$',
          '^v8/tools/SourceMap$',
          '^v8/tools/splaytree$',
          '^v8/tools/tickprocessor-driver$',
          '^v8/tools/tickprocessor$',
          '^node-inspect/lib/_inspect$',
          '^node-inspect/lib/internal/inspect_client$',
          '^node-inspect/lib/internal/inspect_repl$',
          '^async_hooks$',
          '^punycode$',
          '^domain$',
          '^constants$',
          '^sys$',
          '^_linklist$',
          '^_stream_wrap$',
        ],
        dependencyTypes: ['core'],
      },
      comment:
        'A module depends on a node core module that has been deprecated. ' +
        'Find an alternative — node does not deprecate lightly.',
      name: 'no-deprecated-core',
      severity: 'warn',
      from: {},
    },

    {
      comment:
        'This module uses a deprecated npm module. ' +
        'Upgrade or find an alternative — deprecated modules are a security risk.',
      to: {
        dependencyTypes: ['deprecated'],
      },
      name: 'not-to-deprecated',
      severity: 'warn',
      from: {},
    },

    {
      comment:
        'This module depends on an npm package not listed in package.json. ' +
        'Add it to dependencies to guarantee availability at runtime.',
      to: {
        dependencyTypes: ['npm-no-pkg', 'npm-unknown'],
      },
      name: 'no-non-package-json',
      severity: 'error',
      from: {},
    },

    {
      comment:
        'This module depends on a module that cannot be resolved to disk. ' +
        'Add it to package.json or fix the import path.',
      to: {
        couldNotResolve: true,
      },
      name: 'not-to-unresolvable',
      severity: 'error',
      from: {},
    },

    {
      comment:
        'This module depends on an npm package that appears more than once ' +
        'in package.json (e.g. both dependencies and devDependencies). ' +
        'Consolidate to avoid maintenance issues.',
      to: {
        dependencyTypesNot: ['type-only'],
        moreThanOneDependencyType: true,
      },
      name: 'no-duplicate-dep-types',
      severity: 'warn',
      from: {},
    },

    {
      comment:
        'This module depends on a spec/test file. ' +
        'Tests are consumers of code, not providers. ' +
        'Extract shared test utilities into separate modules if needed.',
      to: {
        path: '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$',
      },
      name: 'no-spec-imports',
      severity: 'error',
      from: {},
    },

    {
      comment:
        'This module depends on an optional dependency. ' +
        'This is usually intentional — add an exception if it is by design.',
      to: {
        dependencyTypes: ['npm-optional'],
      },
      name: 'optional-deps-used',
      severity: 'info',
      from: {},
    },

    {
      comment:
        'This module depends on a peer dependency. ' +
        'This is typical for plugins but may indicate a misconfiguration otherwise.',
      to: {
        dependencyTypes: ['npm-peer'],
      },
      name: 'peer-deps-used',
      severity: 'warn',
      from: {},
    },
  ],

  options: {
    doNotFollow: {
      path: [
        '(^|/)(node_modules|dist|coverage|storybook-static|.turbo|.yarn|.vite|cypress|docs|.idea)(/|$)',
        '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$',
        '(^|/)__tests__(/|$)',
        '(^|/)__mocks__(/|$)',
        '(^|/)tests?(/|$)',
      ],
    },

    exclude: {
      path: [
        '(^|/)(node_modules|dist|coverage|storybook-static|.turbo|.yarn|.vite|cypress|docs|.idea)(/|$)',
        '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$',
        '(^|/)__tests__(/|$)',
        '(^|/)__mocks__(/|$)',
        '(^|/)tests?(/|$)',
      ],
    },

    enhancedResolveOptions: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.d.ts'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      mainFields: ['module', 'main', 'types', 'typings'],
      exportsFields: ['exports'],
    },

    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/(?:@[^/]+/[^/]+|[^/]+)',
      },
      text: {
        highlightFocused: true,
      },
    },

    tsConfig: {
      fileName: 'tsconfig.json',
    },

    skipAnalysisNotInRules: true,

    tsPreCompilationDeps: true,
  },
};

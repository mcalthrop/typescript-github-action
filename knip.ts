import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  project: ['src/**'],
  includeEntryExports: true,
  rules: {
    binaries: 'error',
    dependencies: 'error',
    devDependencies: 'error',
    duplicates: 'error',
    enumMembers: 'error',
    exports: 'error',
    namespaceMembers: 'error',
    files: 'error',
    nsExports: 'error',
    nsTypes: 'error',
    types: 'error',
    unlisted: 'error',
    unresolved: 'error',
  },

  // --- BEGIN PLUGINS ---
  biome: true,
  'github-actions': true,
  husky: true,
  typescript: true,
  vitest: true,
  // --- END PLUGINS ---
};

export default config;

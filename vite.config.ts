import type { UserConfig } from 'vite';

export default {
  build: {
    ssr: true,
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    minify: false,
  },
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      reportOnFailure: true,
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
      include: ['src/**/*.ts'],
      exclude: ['src/**/index.ts'],
    },
    clearMocks: true,
    expect: {
      requireAssertions: true,
    },
  },
} satisfies UserConfig;

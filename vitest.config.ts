import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/app/layout.tsx',
        'src/app/page.tsx',
        'src/app/[locale]/layout.tsx',
        'src/app/[locale]/page.tsx',
        'src/app/[locale]/about/page.tsx',
        'src/app/[locale]/certification/page.tsx',
        'src/app/[locale]/contact/page.tsx',
        'src/app/[locale]/products/page.tsx',
        'src/app/[locale]/sustainability/page.tsx',
        'src/app/[locale]/technology/page.tsx',
        'src/proxy.ts',
        'src/components/**',
        'src/hooks/useScrollAnimation.ts',
      ],
      thresholds: {
        lines: 90,
        branches: 90,
        functions: 90,
        statements: 90,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

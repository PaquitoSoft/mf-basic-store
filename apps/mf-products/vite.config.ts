/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inspect from 'vite-plugin-inspect';
import federation from '@originjs/vite-plugin-federation';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/mf-products',

  server: {
    port: 4201,
    host: 'localhost',
  },

  preview: {
    port: 4301,
    host: 'localhost',
  },

  plugins: [
    inspect(),
    react(),
    nxViteTsPaths(),
    federation({
      name: 'mf-products',
      filename: 'remoteEntry.js',
      exposes: {
        './routes': './src/app/routes.tsx',
      },
      remotes: {
        'mf-checkout': 'http://localhost:4302/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    target: 'esnext',
    outDir: '../../dist/apps/mf-products',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/mf-products',
      provider: 'v8',
    },
  },
});

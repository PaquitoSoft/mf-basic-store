/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/mf-checkout',

  server: {
    port: 4202,
    host: 'localhost',
  },

  preview: {
    port: 4302,
    host: 'localhost',
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    federation({
      name: 'mf-checkout',
      filename: 'remoteEntry.js',
      exposes: {
        './routes': './src/app/routes.tsx',
        './shop-cart-context-provider':
          './src/app/components/shop-cart-context.tsx',
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
    outDir: '../../dist/apps/mf-checkout',
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
      reportsDirectory: '../../coverage/apps/mf-checkout',
      provider: 'v8',
    },
  },
});

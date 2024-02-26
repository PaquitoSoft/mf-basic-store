/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { NativeFederationTypeScriptHost } from '@module-federation/native-federation-typescript/vite';

const moduleFederationConfig = {
  name: 'mf-shell',
  remotes: {
    'mf-products': 'http://localhost:4301/assets/remoteEntry.js',
    'mf-checkout': 'http://localhost:4302/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
};

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/mf-shell',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    federation(moduleFederationConfig),
    NativeFederationTypeScriptHost({
      moduleFederationConfig,
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    target: 'esnext',
    outDir: '../../dist/apps/mf-shell',
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
      reportsDirectory: '../../coverage/apps/mf-shell',
      provider: 'v8',
    },
  },
});

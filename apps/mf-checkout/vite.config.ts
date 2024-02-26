/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { NativeFederationTypeScriptRemote } from '@module-federation/native-federation-typescript/vite';

const moduleFederationConfig = {
  name: 'mf-checkout',
  filename: 'remoteEntry.js',
  exposes: {
    './routes': './src/app/routes.tsx',
    './shop-cart-context-provider':
      './src/app/components/shop-cart-context.tsx',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
};

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/mf-checkout',

  server: {
    port: 4202,
    host: 'localhost',
    proxy: {
      '/@mf-types.zip': {
        target: 'http://localhost:4302',
        changeOrigin: true,
        rewrite: () => `/@fs/${process.cwd()}/dist/@mf-types.zip`,
      },
    },
    fs: {
      allow: ['./dist'],
    },
  },

  preview: {
    port: 4302,
    host: 'localhost',
    proxy: {
      '/@mf-types.zip': {
        target: 'http://localhost:4302',
        changeOrigin: true,
        rewrite: () => `/@fs/${process.cwd()}/dist/@mf-types.zip`,
      },
    },
    // fs: {
    //   allow: ['./dist']
    // }
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    federation(moduleFederationConfig),
    NativeFederationTypeScriptRemote({
      moduleFederationConfig,
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

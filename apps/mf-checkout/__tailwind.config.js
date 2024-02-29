const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

console.log('====================================================================');
console.log({ globPatternsForDependencies: createGlobPatternsForDependencies(__dirname) });
console.log('====================================================================');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

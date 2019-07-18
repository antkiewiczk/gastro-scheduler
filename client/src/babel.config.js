// Babel configuration
// https://babeljs.io/docs/usage/api/
module.exports = {
  plugins: [
    // '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    // 'babel-plugin-styled-components',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    // '@babel/preset-flow',
    // '@babel/preset-react',
  ],
  ignore: ['node_modules', 'build'],
};
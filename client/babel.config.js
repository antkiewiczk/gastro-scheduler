module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-styled-components',
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
  ],
  ignore: ['node_modules', 'build'],
};

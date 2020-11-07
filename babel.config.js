module.exports = {
  presets: [
    require.resolve('@docusaurus/core/lib/babel/preset'),
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining'
  ]
};

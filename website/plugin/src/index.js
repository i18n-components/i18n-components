module.exports = function (context, options) {
  return {
    name: "docusaurus-img-svg-loader",
    configureWebpack(config, isServer, utils) {
      const { getCacheLoader } = utils;
      return {
        mergeStrategy: { "module.rules": "append" },
        module: {
          rules: [
            {
              use: [
                {
                  loader: "@svgr/webpack",
                  options: {
                    prettier: false,
                    svgo: true,
                    svgoConfig: { plugins: [{ removeViewBox: false }] },
                    titleProp: true,
                    ref: false,
                  },
                },
              ],
              issuer: { test: /\.(tsx|md|mdx|jsx)?$/ },
              test: /\.svg$/,
            },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: "url-loader",
                    options: {
                      limit: 10000,
                      name: "assets/images/[name]-[hash].[ext]",
                      fallback: "file-loader",
                    },
                  },
                ],
              },
          ],
        },
      };
    },
  };
};

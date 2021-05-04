module.exports = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: [options.defaultLoaders.babel, {
        loader: '@svgr/webpack',
        options: {
          titleProp: true
        }
      }, 'file-loader']
    });
    return config;
  },
  images: {
    domains: ['picsum.photos', 'placehold.jp'],
  },
};

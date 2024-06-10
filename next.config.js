// next.config.js
const { i18n } = require('./next-i18next.config');

module.exports = {
  output: 'standalone',
  images: {
    domains: ['cdn1.ntv.com.tr', 'lh3.googleusercontent.com'],
  },
  i18n,
};

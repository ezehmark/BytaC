const { makeMetroConfig } = require('@react-native/metro-config');

module.exports = makeMetroConfig({
  transformer: {
    babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
  },
  resolver: {
    assetExts: ['db', 'mp3', 'ttf', 'png', 'jpg', 'jpeg'],
  },
});

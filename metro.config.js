const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

config.resolver.assetExts = ['db', 'mp3', 'ttf', 'png', 'jpg', 'jpeg'];
config.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx', 'json'];

module.exports = config;

const { getDefaultConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Ensure WebAssembly files are resolved for Reanimated 3.16
defaultConfig.resolver.assetExts.push('wasm');

module.exports = defaultConfig;

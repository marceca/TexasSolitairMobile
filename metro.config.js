const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Use polling instead of native file watching
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
};

config.watchFolders = [];
config.watcher = {
  // THIS is the correct property
  watchman: false,
};

module.exports = config;

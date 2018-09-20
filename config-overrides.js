const { injectBabelPlugin } = require('react-app-rewired'); /* eslint-disable-line */
const rewireMobX = require('react-app-rewire-mobx');

module.exports = function override(config, env) {
  config = injectBabelPlugin( /* eslint-disable-line */
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    config,
  );
  config = injectBabelPlugin( /* eslint-disable-line */
    ['import', {
      libraryName: 'ant-design-pro', libraryDirectory: 'lib', style: true, camel2DashComponentName: false,
    }],
    config,
  );
  config = rewireMobX(config, env); /* eslint-disable-line */
  return config;
};

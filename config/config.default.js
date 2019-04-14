/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554822768439_6882';

  // add your middleware config here
  config.middleware = ['cors'];

  config.cors = {
    whiteList: ['*']
  }

  config.security = {
    domainWhiteList: ['http://127.0.0.1:23508']
  }

  // port
  config.cluster = {
    listen: {
      path: '',
      port: 1225,
      hostname: '127.0.0.1'
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

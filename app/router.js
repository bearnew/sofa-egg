'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.home.login);
  router.post('/getUserInfo', app.jwt, controller.home.getUserInfo);
  router.post('/praise', app.jwt, controller.home.praise);
};

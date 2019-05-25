'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.home.login);
  router.post('/createOrder', controller.home.createOrder);
  router.post('/getShareUserInfo', controller.home.getShareUserInfo);
  router.post('/getLikesAvatar', controller.home.getLikesAvatar);
  router.post('/praise', app.jwt, controller.home.praise);
};

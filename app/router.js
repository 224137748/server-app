'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 验证码
  router.get('/captcha', controller.util.captcha);

  // 注册user api
  router.group({ name: 'user', prefix: '/user' }, router => {
    const { info, login, register, verify } = controller.user;
    router.post('/register', register);
    router.post('/info', info);
    router.get('/login', login);
    router.get('/verify', verify);
  });
};

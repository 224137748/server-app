'use strict';
const md5 = require('md5');
const BaseController = require('./base');
const HashSalt = '131d3sadsacnmcSJFJDSsfdwqCX31Wzihqodqwfc';

const createRule = {
  email: {
    type: 'email',
  },
  nickname: {
    type: 'string',
  },
  passwd: {
    type: 'string',
  },
  captcha: {
    type: 'string',
  },
};

class UserController extends BaseController {
  async login() {

  }

  async register() {
    const { ctx } = this;
    try {
      // 校验请求参数
      ctx.validate(createRule);

    } catch (e) {
      console.log(e);
      return this.error('参数校验错误', -1, e.errors);
    }

    const { email, nickname, passwd, captcha } = ctx.request.body;
    console.log({ email, nickname, passwd, captcha });

    // 校验验证码
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误', -1, {});
    }

    // 检查邮箱是否重复
    if (await this.checkEmail(email)) {
      return this.error('邮箱已存在重复了', -1, {});
    }

    // 创建用户
    const ret = await this.ctx.model.User.create({
      email,
      nickname,
      passwd: md5(passwd + HashSalt),
    });
    if (ret._id) {
      this.sueccess('注册成功');
    } else {
      this.error('注册失败', -1, {});
    }
  }

  // 检查邮箱是否存在
  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({ email });
    return user;
  }
  async verify() {
    // 校验用户名是否存在
  }

  async info() {

  }
}

module.exports = UserController;

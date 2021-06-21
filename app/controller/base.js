'use strict';

// 定制接口响应规范

const { Controller } = require('egg');

class BaseController extends Controller {
  sueccess(data) {
    this.ctx.body = {
      code: 0,
      data,
      message: 'ok',
    };
  }


  message(message) {
    this.ctx.body = {
      code: 0,
      data: null,
      message,
    };
  }

  error(message, code = -1, errors = {}) {
    this.ctx.body = {
      code,
      message,
      errors,
    };
  }
}

module.exports = BaseController;

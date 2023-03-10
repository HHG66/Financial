/*
 * @Author: HHG
 * @Date: 2023-02-10 12:07:23
 * @LastEditTime: 2023-02-13 10:54:59
 * @LastEditors: 韩宏广
 * @FilePath: \financial\src\router\index.js
 * @文件说明: 
 */
const Router = require('@koa/router');
const fs = require("fs");
const path = require('path');
const requireDirectory = require('require-directory')
const Boom = require('@hapi/boom');


class InitController {
  static InitCore(app) {
    InitController.app = app
    InitController.InitLoadRouters()
  }
  static InitLoadRouters() {
    InitController.readDir(__dirname);
  }
  // static readDir = (entry) => {
  //   let routers = []
  //   let router = require.context('../router', true, /\.js$/);
  //   router.keys().map(rou => {
  //     routers.push(router(rou))
  //     if (router(rou) instanceof Router) {
  //       InitController.app.use(router(rou).routes())
  //       InitController.app.use(router(rou).allowedMethods())
  //     }
  //   })
  // }
  //打包后无法使用，module无法找到
  static readDir = (entry) => {
    // let router = require.context('../router', true, /\.js$/);
    const router = requireDirectory(module, '../router', { visit: ModuleLoad })
    function ModuleLoad(obj) {
      // 如果是路由就进行注册
      if (obj instanceof Router) {
        InitController.app.use(obj.routes())
        InitController.app.use(obj.allowedMethods({
          throw: true,
          notImplemented: () => Boom.notImplemented('方法没有实现'),
          methodNotAllowed: () => Boom.methodNotAllowed( '方法没有实现')
        }))
      }
    }
  }

}
module.exports = InitController
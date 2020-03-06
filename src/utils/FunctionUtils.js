/*
 * @Author: Morpho Sylvie
 * @Date: 2020-02-29 22:11:53
 * @LastEditTime: 2020-03-06 19:20:26
 * @FilePath: \indidea-frontend\src\utils\FunctionUtils.js
 * @Description: 一些函数的工具类
 */

export const imageIsExist = url => {
  // eslint-disable-next-line no-unused-vars
  return new Promise(resolve => {
    // 异步操作，先监听事件，再设置图片源
    var img = new Image();
    img.onload = () => {
      resolve(true);
      img = null;
    };
    img.onerror = () => {
      resolve(false);
      img = null;
    };
    img.src = url;
  });
};

/**
 * 递归比较对象
 */
export const deepEql = (a, b) => {
  let n = a instanceof Object;
  let m = b instanceof Object;
  return n === m;
};

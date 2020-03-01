/*
 * @Author: Morpho Sylvie
 * @Date: 2020-02-29 22:11:53
 * @LastEditTime: 2020-03-01 13:49:57
 * @FilePath: \indidea-frontend\src\utils\FunctionUtils.js
 * @Description: 一些函数的工具类
 */

export const imageIsExist = url => {
  // eslint-disable-next-line no-unused-vars
  return new Promise(resolve => {
    var img = new Image();
    // 异步操作，先监听事件，再设置图片源
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

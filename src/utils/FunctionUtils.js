/*
 * @Author: Morpho Sylvie
 * @Date: 2020-02-29 22:11:53
 * @LastEditTime: 2020-02-29 22:17:52
 * @FilePath: \indidea-frontend\src\utils\FunctionUtils.js
 * @Description: 一些函数的工具类
 */

export const imageIsExist = url => {
  return new Promise(resolve => {
    var img = new Image();
    img.src = url;
    img.onload = () => {
      if (this.complete == true) {
        resolve(true);
        img = null;
      }
    };
    img.onerror = () => {
      resolve(false);
      img = null;
    };
  });
};

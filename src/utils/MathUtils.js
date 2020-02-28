/*
 * @Author: Morpho Sylvie
 * @Date: 2020-02-28 15:43:29
 * @LastEditTime: 2020-02-28 15:50:54
 * @FilePath: \indidea-frontend\src\utils\MathUtils.js
 * @Description:
 */

export const getPercent = function(num, total) {
  if (isNaN(num) || isNaN(total)) {
    return "-";
  }
  return Math.round((num / total) * 100) + "%";
};

export default {
  getPercent
};

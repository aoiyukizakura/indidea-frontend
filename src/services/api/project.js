/*
 * @Author: Morpho Sylvie
 * @Date: 2020-03-13 10:40:10
 * @LastEditTime: 2020-03-13 11:03:37
 * @FilePath: \indidea-frontend\src\services\api\project.js
 * @Description: project apis
 */
import request from "../request";

export const saveChange = data => {
  return request({
    url: "/api/project/update",
    method: "put",
    data: data
  });
};

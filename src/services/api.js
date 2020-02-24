/*
 * @Author: Morpho Sylvie
 * @Date: 2020-02-22 16:21:37
 * @LastEditTime: 2020-02-24 16:28:25
 * @FilePath: \indidea-frontend\src\services\api.js
 * @Description: api接口文件
 */
import request from "./request";

export const login = loginData => {
  return request({
    url: "/api/users/login",
    method: "post",
    data: loginData
  });
};
export const register = registerData => {
  return request({
    url: "/api/users/register",
    method: "post",
    data: registerData
  });
};
export const user = userId => {
  return request({
    url: "/api/users/" + userId,
    method: "get"
  });
};
export const userInfo = () => {
  return request({
    url: "/api/me",
    method: "get"
  });
};

/*
 * @Author: Morpho Sylvie
 * @Date: 2020-03-28 15:52:20
 * @LastEditTime: 2020-03-28 15:53:01
 * @FilePath: \indidea-frontend\src\services\api\user.js
 * @Description: 
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
/**
 * 根据userId获取user信息
 * @param {*} userId
 */
export const user = userId => {
  return request({
    url: "/api/users/" + userId,
    method: "get"
  });
};
/**
 * 根据token获取我的信息
 */
export const myInfo = () => {
  return request({
    url: "/api/users",
    method: "get"
  });
};

export const logout = () => {
  return request({
    url: "/api/users/logout",
    method: "get"
  });
};

/*
 * @Author: Morpho Sylvie
 * @Date: 2020-02-22 16:21:37
 * @LastEditTime: 2020-03-01 16:31:06
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
export const category = () => {
  return request({
    url: "/api/category",
    method: "get"
  });
};
export const getMyProjects = () => {
  return request({
    url: "/api/users/getMyProjects",
    method: "get"
  });
};
export const getTop9Projects = () => {
  return request({
    url: "/api/project/top9Project",
    method: "get"
  });
};
export const getFeatured = () => {
  return request({
    url: "/api/project/featuredProject",
    method: "get"
  });
};
export const getTopHitProject = () => {
  return request({
    url: "/api/project/topHitProject",
    method: "get"
  });
};

/*
 * @Author: Morpho Sylvie
 * @Date: 2020-02-22 16:21:37
 * @LastEditTime: 2020-03-19 15:10:17
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
/**
 * 获取分类信息
 */
export const category = () => {
  return request({
    url: "/api/category",
    method: "get"
  });
};
/**
 * 获取我的方案
 */
export const getMyProjects = () => {
  return request({
    url: "/api/users/getMyProjects",
    method: "get"
  });
};
/**
 * 获取刚出炉的9个方案
 */
export const getTop9Projects = () => {
  return request({
    url: "/api/project/top9Project",
    method: "get"
  });
};
/**
 * 获取精选的方案
 */
export const getFeatured = () => {
  return request({
    url: "/api/project/featuredProject",
    method: "get"
  });
};
/**
 * 获取最高点击的方案
 */
export const getTopHitProject = () => {
  return request({
    url: "/api/project/topHitProject",
    method: "get"
  });
};
/**
 * start一个项目
 */
export const createProject = projectData => {
  return request({
    url: "/api/project",
    method: "post",
    data: projectData
  });
};
/**
 * 根据ID获取正在编辑的项目
 * @param queryData.id 项目id
 * @param queryData.flag 0编辑状态 1正常状态
 */
export const getProjectByFlagById = queryData => {
  return request({
    url: "/api/project/getProjectByFlagById",
    method: "get",
    params: queryData
  });
};
/**
 * 提交项目给管理员审批
 */
export const waitCheckProject = queryData => {
  return request({
    url: "api/project/waitCheckProject",
    method: "put",
    data: queryData
  });
};

/**
 * 让项目重回编辑状态
 */
export const backToEdit = queryData => {
  return request({
    url: "/api/project/backToEdit",
    method: "put",
    data: queryData
  });
};

/**
 * 发送项目
 */
export const sendProject = queryData => {
  return request({
    url: "/api/project/sendProject",
    method: "put",
    data: queryData
  });
};
/**
 * 上传文件
 */
export const uploadFile = fileData => {
  return request({
    url: "/api/uploadFile",
    method: "post",
    data: fileData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
/**
 * 删除文件
 */
export const deleteFile = filename => {
  return request({
    url: "/api/uploadFile",
    method: "delete",
    params: {
      filename: filename
    }
  });
};
/**
 * 更新项目
 */
export const updateProject = updateData => {
  return request({
    url: "/api/project/update",
    method: "post",
    data: updateData
  });
};

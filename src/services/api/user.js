/*
 * @Author: Morpho Sylvie
 * @Date: 2020-03-28 15:52:20
 * @LastEditTime: 2020-04-19 16:47:10
 * @FilePath: \indidea-frontend\src\services\api\user.js
 * @Description:
 */
import request from "../request";

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
 * @param {Number} userId
 */
export const user = userId => {
  return request({
    url: `/api/users/${userId}`,
    method: "get"
  });
};
/**
 * 更新用户
 * @param {    
    String username
    String website
    String address
    String des
    String avatar
    String password
  } query 查询字段
 */
export const updateUser = query => {
  return request({
    url: `/api/users`,
    method: "put",
    data: query
  });
};
export const updatePass = (oldpass, newpass) => {
  return request({
    url: `/api/users/updatePass`,
    method: "put",
    params: { oldpass, newpass }
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
 * 上传头像
 * @param {File} avatar 头像
 */
export const avatar = avatar => {
  return request({
    url: "/api/users/avatar",
    method: "post",
    data: avatar,
    headers: {
      "Content-Type": "multipart/form-data"
    }
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
 * 积分使用列表
 */
export const pointList = (index, size) => {
  return request({
    url: `/api/users/pointList/${index}/${size}`,
    method: "get"
  });
};
/**
 * 支持过的次数
 */
export const supportNum = () => {
  return request({
    url: "/api/users/supportNum",
    method: "get"
  });
};
/**
 * 我最爱的项目
 */
export const myFavProject = (index, size) => {
  return request({
    url: `/api/users/myFavProject/${index}/${size}`,
    method: "get"
  });
};
/**
 * 我支持过的项目
 */
export const mySupport = () => {
  return request({
    url: "/api/users/mySupport",
    method: "get"
  });
};
/**
 * 充值积分
 * @param {Number} point 积分数量
 */
export const addPoint = point => {
  return request({
    url: "/api/users/addPoint",
    method: "put",
    params: { point }
  });
};
/**
 * 获取待回答项目列表
 * @param {Number} projectId 项目Id
 */
export const waitReply = projectId => {
  return request({
    url: `/api/project/waitReply/${projectId}`,
    method: "get"
  });
};
/**
 * 回答别人的提问
 * @param {Number} quzId 问答的id
 * @param {String}} content 回答的内容
 */
export const replyQuz = (quzId, content) => {
  return request({
    url: `/api/project/replyQuz/${quzId}`,
    method: "post",
    params: { reply: content }
  });
};
/**
 * 更新项目日志
 * @param {Number} projectId 项目id
 * @param {String} title 更新标题
 * @param {String} content 更新内容
 */
export const updateLog = (projectId, title, content) => {
  return request({
    url: `/api/project/updateLog/${projectId}`,
    method: "put",
    data: { title, content }
  });
};
/**
 * 某个项目的支持记录
 * @param {Number} projectId 项目ID
 */
export const supportHistory = projectId => {
  return request({
    url: "/api/users/supportHistory",
    method: "get",
    params: { projectId }
  });
};
/**
 * 获取用户的申请状态
 */
export const checkApplyStatus = () => {
  return request({
    url: "/api/users/checkApplyStatus",
    method: "get"
  });
};
/**
 * 申请
 */
export const doApply = () => {
  return request({
    url: "/api/users/doApply",
    method: "post"
  });
};

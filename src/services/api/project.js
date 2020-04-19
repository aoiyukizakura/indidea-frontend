/*
 * @Author: Morpho Sylvie
 * @Date: 2020-03-13 10:40:10
 * @LastEditTime: 2020-04-19 19:16:31
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

export const rewardListByProjectId = projectId => {
  return request({
    url: "/api/reward/rewardListByProjectId",
    method: "get",
    params: {
      projectId
    }
  });
};

export const saveReward = data => {
  return request({
    url: "/api/reward/saveReward",
    method: "post",
    data: data
  });
};

export const deleteReward = rewardId => {
  return request({
    url: "/api/reward/deleteReward",
    method: "delete",
    params: { rewardId }
  });
};
export const getReward = rewardId => {
  return request({
    url: "/api/reward/" + rewardId,
    method: "get"
  });
};

export const searchProject = query => {
  return request({
    url: "/api/project/searchProject",
    method: "get",
    params: query
  });
};

export const getProjectById = projectId => {
  return request({
    url: "/api/project/" + projectId,
    method: "get"
  });
};

export const getProjectWithoutHit = projectId => {
  return request({
    url: "/api/project",
    method: "get",
    params: { id: projectId }
  });
};

export const countSponsorByProjectId = projectId => {
  return request({
    url: "/api/project/countSponsorByProjectId/" + projectId,
    method: "get"
  });
};

export const saveStatus = projectId => {
  return request({
    url: "/api/project/saveStatus",
    method: "get",
    params: { projectId }
  });
};
/**
 * 收藏项目
 * @param {Number} projectId 项目ID
 * @param {Number} flag 1 收藏 0删除
 */
export const saveProject = (projectId, flag) => {
  return request({
    url: "/api/project/saveProject",
    method: "put",
    params: { projectId, flag }
  });
};

export const supportProject = (projectId, point, rewardId) => {
  return request({
    url: "/api/project/supportProject",
    method: "post",
    params: { projectId, point, rewardId }
  });
};

export const quzList = projectId => {
  return request({
    url: "/api/project/quzList",
    method: "get",
    params: { projectId }
  });
};

export const addQuz = (projectId, quz) => {
  return request({
    url: "/api/project/addQuz",
    method: "post",
    params: { projectId, quz }
  });
};

export const logList = projectId => {
  return request({
    url: "/api/project/logList",
    method: "get",
    params: { projectId }
  });
};

export const msgList = projectId => {
  return request({
    url: "/api/project/msgList",
    method: "get",
    params: { projectId }
  });
};

export const addMsg = (projectId, content) => {
  return request({
    url: "/api/project/addMsg",
    method: "post",
    params: { projectId, content }
  });
};

export const report = (projectId, content) => {
  return request({
    url: "/api/project/report",
    method: "post",
    params: { projectId, content }
  });
};
export const deleteProject = projectId => {
  return request({
    url: `/api/project/${projectId}`,
    method: "delete"
  });
};
export const sponsorList = projectId => {
  return request({
    url: `/api/project/${projectId}/sponsorList`,
    method: "get"
  });
};

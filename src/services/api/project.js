/*
 * @Author: Morpho Sylvie
 * @Date: 2020-03-13 10:40:10
 * @LastEditTime: 2020-03-18 19:22:35
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

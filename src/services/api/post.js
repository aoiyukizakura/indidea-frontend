/*
 * @Author: Morpho Sylvie
 * @Date: 2020-04-02 15:28:42
 * @LastEditTime: 2020-04-02 20:42:31
 * @FilePath: \indidea-frontend\src\services\api\post.js
 * @Description:
 */
import request from "../request";

/**
 * 获取列表
 * @param {Number} status 列表的状态 0全部 1我赞过的 2我的
 */
export const postList = (status, page, pageSize) => {
  return request({
    url: `/api/post/${status}`,
    method: "get",
    params: {
      page,
      pageSize
    }
  });
};
/**
 * 获取某个post的评论列表
 * @param {Number} postId postId
 */
export const commentByPostId = postId => {
  return request({
    url: `/api/post/commentByPostId/${postId}`,
    method: "get"
  });
};
/**
 * 发布post
 * @param {String} content 发表内容
 * @param {String} images 发表的图片。先用upload再用这个
 */
export const doPost = (content, images) => {
  return request({
    url: `/api/post/doPost`,
    method: "post",
    params: { content, images }
  });
};

/**
 * 发表评论
 * @param {Number} postId postId
 * @param {String} content 发表内容
 */
export const doComment = (postId, content) => {
  return request({
    url: `/api/post/doComment/${postId}`,
    method: "post",
    params: { content }
  });
};
/**
 * 点赞post，如果已经点过，那么此操作会取消点赞
 * @param {Number} postId postId
 */
export const doLike = postId => {
  return request({
    url: `/api/post/like/${postId}`,
    method: "post"
  });
};
/**
 * 删除post
 * @param {Number} postId postId
 */
export const deletePost = postId => {
  return request({
    url: `/api/post/${postId}`,
    method: "delete"
  });
};

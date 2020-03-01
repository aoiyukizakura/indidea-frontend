/*
 * @Author: Morpho Sylvie
 * @Date: 2020-02-23 17:54:00
 * @LastEditTime: 2020-03-01 17:51:36
 * @FilePath: \indidea-frontend\src\utils\Constants.js
 * @Description: 一些公共的常量
 */

export const USER_EMAIL = "userEmail";
export const USER_PASSWORD = "userPassword";
export const REMEMBER_STATUS = "rememberStatus";
export const TOKEN = "token";
export const USER_INFO = "userInfo";
export const USER_DATA = JSON.parse(localStorage.getItem(USER_INFO));

export default {
  USER_EMAIL,
  USER_PASSWORD,
  REMEMBER_STATUS,
  TOKEN,
  USER_INFO,
  USER_DATA
};

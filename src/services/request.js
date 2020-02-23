/* eslint-disable no-unused-vars */
import axios from "axios";
import Qs from "qs";
import { autoMatch, checkStatus } from "./utils";
import { Message } from "view-design";
import { TOKEN } from "../utils/Constants";

const token = localStorage.getItem(TOKEN);

const instance = axios.create({
  timeout: 3000,
  transformRequest: [
    data => {
      // 处理data
      return data;
    }
  ],
  transformResponse: [
    res => {
      // 处理响应
      return JSON.parse(res);
    }
  ]
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    config.headers = Object.assign(
      {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8" //  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      config.headers
    );
    if (token) {
      config.headers["token"] = token;
    }
    if (config.method === "post") {
      const contentType = config.headers["Content-Type"];
      if (contentType) {
        // 根据实际情况对数据进行处理
        if (contentType.includes("mutipart")) {
          // config.data = data;
        } else if (contentType.includes("json")) {
          config.data = JSON.stringify(config.data);
        } else {
          config.data = Qs.stringify(config.data);
        }
      }
    }
    console.log("config :", config);
    return Promise.resolve(config);
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做处理，以下根据实际数据结构改动！！...

    const { code } = response.data || {};
    if (code === "404") {
      // 请求超时，跳转登录页
      const instance = Message("请求超时，即将跳转到登录页面...");
      setTimeout(() => {
        instance.close();
        window.location.href = "/login";
      }, 3000);
    }
    return Promise.resolve(checkStatus(response));
  },
  error => {
    // 对响应错误做处理...
    if (error.response) {
      return Promise.reject(checkStatus(error.response));
    } else if (
      error.code == "ECONNABORTED" &&
      error.message.indexOf("timeout") != -1
    ) {
      return Promise.reject({ msg: "请求超时" });
    } else {
      return Promise.reject(error);
    }
  }
);

const request = async function(opt) {
  const options = Object.assign(
    {
      method: "get",
      ifHandleError: true // 是否统一处理接口失败(提示)
    },
    opt
  );
  console.log("options :", options);
  try {
    // 匹配接口前缀 开发环境则通过proxy配置转发请求； 生产环境根据实际配置
    options.baseURL = autoMatch(options.prefix);

    const res = await instance(options);
    // console.log(res);
    if (!res.success && options.ifHandleError) {
      // 自定义参数，是否允许全局提示错误信息
      Message(res.error || "请求处理失败！");
    }
    return res;
  } catch (err) {
    if (options.ifHandleError) {
      // 自定义参数，是否允许全局提示错误信息
      Message(err.msg || "请求处理失败！");
    }
    return err;
  }
};

export default instance;

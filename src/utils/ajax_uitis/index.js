import axios from "axios";
import { message } from "antd";

// const baseURL = "http://180.184.74.25:80";
// axios.defaults.headers["Content-Type"] = "application/json";
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error);
  }
);
function ajax(url, data = {}, type = "GET") {
  const token = `Bearer ${localStorage.getItem("token")}`;

  return new Promise((resolve) => {
    let promise;
    if (type === "GET") {
      promise = axios.get(
        url,
        {
          params: data,
          headers: {
            Authorization: token,
          },
        } //指定参数
      );
    } else if (type === "POST") {
      promise = axios.post(url, data, {
        headers: {
          Authorization: token,
        },
      });
    } else if (type === "DELETE") {
      promise = axios.delete(url, data, {
        headers: {
          Authorization: token,
        },
      });
    } else if (type === "PUT") {
      promise = axios.put(url, data, {
        headers: {
          Authorization: token,
        },
      });
    }
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        message.error("请求出错了：" + error.message);
      });
  });
}

export const reqRegister = (name, password) =>
  ajax("/agent/register", { name, password }, "POST");

export const reqLogin = (name, password) =>
  ajax("/agent/login", { name, password }, "POST");

export const reqGetProject = () => ajax("/agent/project/list");

export const reqEditor = (projectid) =>
  ajax(`/agent/${projectid}/project`, {}, "DELETE");

export const reqGetDetail = (projectId) =>
  ajax(`/agent/active/${projectId}`, {}, "GET");

export const reqUpdate = (projectId, data) =>
  ajax(`agent/update/${projectId}`, data, "PUT");

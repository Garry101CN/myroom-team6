import axios from "axios";
import { message } from "antd";

// const baseURL = "http://180.184.74.25:80";
// axios.defaults.headers["Content-Type"] = "application/json";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve) => {
    let promise;
    if (type === "GET") {
      promise = axios.get(url, {
        params: data, //指定参数
      });
    } else {
      promise = axios.post(url, data);
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

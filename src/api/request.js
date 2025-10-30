import axios from "axios";
import authStore from "../store/authStore";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_PROD, // api 的 base_url
  timeout: 5000, // 请求超时时间
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // 例如，可以在这里添加 token
    const { token } = authStore.getState();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    // For successful responses (HTTP status 2xx), return the data directly.
    // The backend's sendSuccessResponse already formats it with 'message' and 'data' fields.
    return response.data;
  },
  (error) => {
    // For error responses (non-2xx HTTP status), reject the promise.
    // The error object will contain error.response.data for further handling.
    console.log("err" + error); // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    return Promise.reject(error);
  }
);

export default service;

import request from "./request";

export function get(url, params) {
  return request({
    url: url,
    method: "get",
    params: params,
  });
}

export function post(url, data) {
  return request({
    url: url,
    method: "post",
    data: data,
  });
}

export function put(url, data) {
  return request({
    url: url,
    method: "put",
    data: data,
  });
}

export function del(url, params) {
  return request({
    url: url,
    method: "delete",
    params: params,
  });
}

// 可以根据需要添加其他请求方法，例如 put, delete 等

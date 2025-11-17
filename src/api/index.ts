import request from "./request";
import type { ApiResponse } from "@/types/api";

export function get(url: string, params?: Record<string, any>): Promise<ApiResponse> {
  return request({
    url: url,
    method: "get",
    params: params,
  });
}

export function post(url: string, data?: any): Promise<ApiResponse> {
  return request({
    url: url,
    method: "post",
    data: data,
  });
}

export function put(url: string, data?: any): Promise<ApiResponse> {
  return request({
    url: url,
    method: "put",
    data: data,
  });
}

export function patch(url: string, data?: any): Promise<ApiResponse> {
  return request({
    url: url,
    method: "patch",
    data: data,
  });
}

export function del(url: string, params?: Record<string, any>): Promise<ApiResponse> {
  return request({
    url: url,
    method: "delete",
    params: params,
  });
}

// 可以根据需要添加其他请求方法，例如 put, delete 等

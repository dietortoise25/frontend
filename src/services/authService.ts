import { post } from "../api";
import type { ApiResponse } from "../types/api";

interface AuthResult {
  success: boolean;
  message: string;
  data?: any;
}

export const registerUser = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const response: ApiResponse = await post("/signup", {
      email,
      password,
    });
    return { success: true, message: response.message || "注册成功！" };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "注册失败！",
    };
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem('token');
  // Optionally, you might want to redirect the user after logout
  // window.location.href = '/login';
};

export const loginUser = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const response: ApiResponse = await post("/login", {
      email,
      password,
    });
    return {
      success: true,
      message: response.message || "登录成功！",
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "登录失败！",
    };
  }
};

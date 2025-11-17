import { post } from "../api";

export const registerUser = async (email, password) => {
  try {
    const response = await post("/signup", {
      email,
      password,
    });
    return { success: true, message: response.message || "注册成功！" };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "注册失败！",
    };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  // Optionally, you might want to redirect the user after logout
  // window.location.href = '/login';
};

export const loginUser = async (email, password) => {
  try {
    const response = await post("/login", {
      email,
      password,
    });
    return {
      success: true,
      message: response.message || "登录成功！",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "登录失败！",
    };
  }
};

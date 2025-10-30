import { get, post, patch, del } from "../api";

const API_URL = "/products";

export const createProduct = async (productData) => {
  return post(API_URL, productData);
};

export const getProducts = async (page = 1, limit = 10, search = "") => {
  return get(`${API_URL}?page=${page}&limit=${limit}&search=${search}`);
};

export const getProductById = async (id) => {
  return get(`${API_URL}/${id}`);
};

export const updateProduct = async (productData) => {
  return patch(API_URL, productData);
};

export const deleteProduct = async (id) => {
  return del(`${API_URL}/${id}`);
};

export const getProductCount = async (search = "") => {
  return get(`${API_URL}/count?search=${search}`);
};

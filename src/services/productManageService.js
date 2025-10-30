import { get, post, put, del } from "../api";

const API_URL = "/products-manage";

export const createProduct = async (productData) => {
  return post(API_URL, productData);
};

export const getProducts = async () => {
  return get(API_URL);
};

export const getProductById = async (id) => {
  return get(`${API_URL}/${id}`);
};

export const updateProduct = async (id, productData) => {
  return put(`${API_URL}/${id}`, productData);
};

export const deleteProduct = async (id) => {
  return del(`${API_URL}/${id}`);
};

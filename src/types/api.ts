// API 请求和响应通用类型
export interface ApiResponse<T = any> {
  message: string;
  data: T;
  success: boolean;
}

export interface ApiError {
  message: string;
  success: false;
  error?: string;
}

// 产品相关类型
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  min_price?: number;
  max_price?: number;
  images: string[];
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  min_price?: number;
  max_price?: number;
  images: string[];
  is_active?: boolean;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface ProductListResponse {
  message: string;
  data: Product[];
  success: boolean;
}

// 用户认证相关类型
export interface User {
  id: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirm_password: string;
}

export interface AuthResponse {
  message: string;
  data: {
    user: User;
    token: string;
  };
  success: boolean;
}

// Toast 类型
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// 路由相关类型
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  requireAuth?: boolean;
}

// 图片上传类型
export interface ImageUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  multiple?: boolean;
}

export interface UploadedImage {
  url: string;
  name: string;
  size: number;
  type: string;
}

// Supabase Storage 相关类型
export interface SupabaseStorageResponse {
  data: {
    path: string;
    fullPath: string;
    id: string;
  } | null;
  error: {
    message: string;
  } | null;
}

export interface SupabaseUploadResponse {
  data: {
    path: string;
    fullPath: string;
    id: string;
  } | null;
  error: {
    message: string;
  } | null;
}
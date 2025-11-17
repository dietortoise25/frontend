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

// 用户相关类型
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
  user: User;
  session: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
}

// API响应类型
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  count: number;
  page?: number;
  total_pages?: number;
}

// Toast类型
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

// 环境变量类型
export interface EnvConfig {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
  VITE_API_BASE_URL?: string;
  VITE_API_ENV?: 'dev' | 'prod';
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
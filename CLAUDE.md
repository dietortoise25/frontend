# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述
这是一个基于 React 19 + TypeScript + Vite 的电商产品目录前端应用，集成了 Supabase 作为后端服务和认证系统。项目已完成从 JavaScript 到 TypeScript 的迁移，具有完整的类型定义。

## 技术栈
- **前端框架**: React 19 + TypeScript + Vite
- **路由**: React Router v7
- **状态管理**: Zustand
- **样式**: TailwindCSS v4 + DaisyUI
- **UI图标**: Lucide React
- **HTTP客户端**: Axios
- **后端服务**: Supabase
- **包管理**: pnpm

## 开发命令

### 包管理
```bash
# 安装依赖
pnpm install

# 添加依赖
pnpm add <package-name>

# 添加开发依赖
pnpm add -D <package-name>
```

### 开发和构建
```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview

# 代码检查
pnpm lint

# 类型检查
pnpm type-check
```

## 项目架构

### 目录结构
```
src/
├── assets/           # 静态资源文件
├── components/       # 可复用组件
│   ├── Toast/       # Toast通知组件
│   ├── ImageViewer/ # 图片查看器组件
│   ├── PrivateRoute.tsx # 路由守卫组件
│   └── ...          # 其他UI组件
├── pages/           # 页面组件
│   ├── Admin/       # 管理员页面(含子组件)
│   ├── Home.tsx     # 首页
│   ├── Product.tsx  # 产品页
│   ├── Login.tsx    # 登录页
│   └── Register.tsx # 注册页
├── services/        # 业务逻辑服务
│   ├── authService.ts      # 认证服务
│   ├── productService.ts   # 产品服务
│   ├── productManageService.ts # 产品管理服务
│   └── apiStorage.ts      # API存储服务
├── store/           # Zustand状态管理
│   ├── authStore.ts     # 认证状态
│   └── toastStore.ts    # Toast状态
├── api/             # API请求封装
│   ├── index.ts         # HTTP方法封装
│   └── request.ts       # Axios请求配置
├── utils/           # 工具函数
│   ├── supabaseClient.ts # Supabase客户端
│   ├── supabaseStorage.ts # Supabase存储
│   ├── useApiUrl.ts    # API URL配置
│   └── formatPrice.ts  # 价格格式化
├── hooks/           # 自定义Hooks
│   └── useToast.ts     # Toast Hook
├── router/          # 路由配置
│   └── index.tsx        # React Router配置
├── types/           # TypeScript类型定义
│   ├── index.ts         # 主要类型定义
│   └── api.ts          # API相关类型
├── App.tsx          # 主应用组件
├── main.tsx         # 应用入口
└── style.css        # 全局样式
```

### 核心架构组件

#### 状态管理 (Zustand)
- `authStore.ts`: 管理用户认证状态，包括登录、登出和token管理
- `toastStore.ts`: 管理Toast通知状态

#### 类型系统 (TypeScript)
- `types/index.ts`: 主要类型定义，包括Product、User、API响应等
- `types/api.ts`: API相关专用类型定义
- 严格的类型检查配置，提供良好的开发体验

#### 路由系统
- 使用React Router v7的`createBrowserRouter`
- 包含路由守卫(`PrivateRoute`)保护管理员页面
- 路由配置集中管理在`router/index.tsx`

#### API层
- 统一的HTTP请求封装(`api/index.ts`)
- Axios配置(`api/request.ts`)
- 服务层按业务模块分离(`services/`)

#### 认证系统
- 基于localStorage的token存储
- 应用启动时自动检查认证状态
- 路由级别的访问控制

#### Supabase集成
- 作为后端服务和数据存储
- 支持文件上传功能
- 环境变量配置：`VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`

## 环境配置

### 环境变量
项目需要以下环境变量：
```env
VITE_DEV_MODE=false
VITE_APP_BASE_API_DEV=http://localhost:3000/v1
VITE_APP_BASE_API_PROD=https://backend20251029.dietortoise25.deno.net/v1
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

### API环境
项目支持开发/生产环境切换，通过`utils/useApiUrl.ts`管理不同的API端点。

### TypeScript配置
- 严格模式已启用，但放宽了部分检查以提高开发效率
- 路径别名配置：`@/*` 映射到 `src/*`
- 支持JSX和现代ES特性

## 样式系统

### TailwindCSS v4配置
- 使用`@import "tailwindcss"`导入
- 集成DaisyUI组件库
- 支持主题切换：autumn(默认), forest(暗色)

### 自定义样式
- 定义了dark主题变体
- 样式配置在`src/style.css`中

## 开发注意事项

### 路由配置
- 使用嵌套路由结构，App组件作为布局组件
- 管理员路由需要认证保护

### 状态管理约定
- 使用Zustand进行状态管理
- 认证状态持久化到localStorage
- Toast通知使用全局状态管理

### TypeScript开发
- 所有新组件和服务应使用TypeScript
- 优先使用已定义的类型(`types/index.ts`)
- API调用应遵循类型安全原则

### 组件开发
- 优先使用DaisyUI组件
- 图标使用Lucide React
- 组件按功能和页面分组组织

### API调用
- 统一使用services层封装业务逻辑
- API请求通过封装的HTTP方法调用
- 支持分页、搜索等通用功能
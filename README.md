# 🚀 DujiAPI — AI Token API 中转站

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-087EA4?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**一个 API 接口，畅连全球主流 AI 大模型 · 智能路由 · 成本直降 70%**

</div>

---

## 📖 目录

- [项目概述](#-项目概述)
- [核心功能](#-核心功能)
- [技术栈](#-技术栈)
- [支持的模型](#-支持的模型)
- [环境要求](#-环境要求)
- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [页面区块](#-页面区块)
- [API 接口文档](#-api-接口文档)
- [测试指南](#-测试指南)
- [部署指南](#-部署指南)
- [贡献规范](#-贡献规范)
- [许可证](#-许可证)
- [联系方式](#-联系方式)

---

## 📌 项目概述

**DujiAPI** 是面向开发者的一站式 AI Token API 中转服务平台。通过统一的 API 接口，开发者只需对接一次即可调用 OpenAI、Anthropic（Claude）、Google（Gemini）、DeepSeek、智谱清言（GLM）、MinMax、Kimi、小米（MiMo）等主流 AI 大模型。平台内置智能路由、负载均衡、故障自动转移和用量监控等企业级能力，帮助团队以更低的集成成本和更高的可靠性落地 AI 应用。

### 核心价值

| 价值维度 | 说明 |
|---------|------|
| **统一接入** | 一套 API 接口覆盖全模型，无需逐一对接各平台 SDK |
| **成本优化** | 智能路由自动匹配最优模型与节点，节省高达 70% Token 成本 |
| **高可用性** | 多节点负载均衡与故障自动切换，99.9% 服务可用性 |
| **透明可控** | 实时用量数据、成本分析和异常告警，Token 支出完全透明 |

---

## ✨ 核心功能

### 1. 多模型聚合

一个标准化的 API 接口即可调用 OpenAI、Claude、Gemini 等模型，无需分别学习和对接各个平台的 SDK，极大简化集成复杂度。

### 2. 智能路由

- 自动选择低延迟节点的最优路径
- 实时检测上游服务可用性，故障节点自动剔除
- 支持自定义权重和策略配置
- 高并发场景下自动负载均衡

### 3. 用量可视化

- 实时 Token 消耗监控面板
- 按模型/时间维度的成本分析报表
- 自定义异常告警阈值
- API 调用链路追踪

### 4. 灵活订阅

- 从免费体验到企业无限量方案
- 按需选择点数额度和刷新频率
- 所有方案均可访问全部模型

### 5. 安全可靠

- HTTPS 全链路加密
- Token 级别的权限控制
- API Key 防泄漏机制
- 完善的日志审计

---

## 🛠 技术栈

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| **运行时** | [Node.js](https://nodejs.org/) | ≥ 18.0 | JavaScript 运行时 |
| **框架** | [Next.js](https://nextjs.org/) | 15.5 | React 全栈框架 (Turbopack) |
| **UI** | [React](https://react.dev/) | 19 | 用户界面库 |
| **语言** | [TypeScript](https://www.typescriptlang.org/) | 5.8 | 类型安全的 JavaScript 超集 |
| **样式** | [Tailwind CSS](https://tailwindcss.com/) | 4 | 原子化 CSS 框架 (CDN 模式) |
| **动画** | [Framer Motion](https://www.framer.com/motion/) | 11 | React 动画库 |
| **包管理** | [npm](https://www.npmjs.com/) | 10+ | Node.js 包管理器 |

### 选型说明

| 技术决策 | 理由 |
|---------|------|
| **Next.js (App Router)** | 原生支持 React Server Components、文件系统路由、SEO 优化 |
| **Turbopack** | 比 Webpack 快 10 倍的增量编译，开发体验极佳 |
| **Tailwind CSS CDN** | 零构建配置，极快的样式迭代速度 |
| **TypeScript** | 编译期类型检查，减少运行时错误 |
| **Framer Motion** | 声明式动画 API，流畅的页面过渡效果 |

---

## 🤖 支持的模型

| 品牌 | 模型名称 | 版本 |
|------|---------|------|
| **Anthropic** | Claude Opus 4 / Sonnet 4 / Haiku 4 | v4.7 |
| **OpenAI** | GPT-5 Turbo / GPT-5 Pro / GPT-4o | v5.5 |
| **Google** | Gemini 2.5 Pro / 2.5 Flash / 2.0 Ultra | latest |
| **DeepSeek** | DeepSeek V3 / R1 / Coder | latest |
| **Z.ai (智谱清言)** | GLM-4 Plus / GLM-4V Plus / GLM-3 Turbo | latest |
| **MinMax** | abab 7 / 6.5S / abab 6 | latest |
| **Kimi (Moonshot)** | moonshot-v1-128K / 32K / 8K | latest |
| **Xiaomi (小米)** | MiMo-72B / 8B / 1.8B | latest |

---

## 📋 环境要求

### 开发环境

| 依赖 | 最低版本 | 推荐版本 |
|------|---------|---------|
| **Node.js** | 18.0.0 | 20 LTS |
| **npm** | 9.0.0 | 10+ |
| **操作系统** | macOS / Linux / Windows (WSL2) | macOS 14+ / Ubuntu 22.04+ |

### 浏览器兼容性

| 浏览器 | 最低版本 |
|--------|---------|
| **Chrome** | 90+ |
| **Firefox** | 90+ |
| **Safari** | 15+ |
| **Edge** | 90+ |

### 可选依赖

- **Git** — 版本控制
- **VS Code** — 推荐编辑器（含推荐扩展）

---

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone <repository-url>
cd token-api
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

开发服务器启动后访问 **[http://localhost:3000](http://localhost:3000)** 即可查看项目。

### 4. 构建生产版本

```bash
npm run build       # 执行 TypeScript 类型检查并构建
npm start           # 启动生产服务器 (默认端口 3000)
```

### NPM Scripts

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 (Turbopack 热更新) |
| `npm run build` | 类型检查 + 生产构建 |
| `npm start` | 启动生产服务器 |

---

## 📁 项目结构

```
token-api/
├── app/
│   ├── globals.css        # 全局样式与 Tailwind 配置
│   ├── layout.tsx         # 根布局 + SEO 元数据
│   └── page.tsx           # 首页入口 →
├── components/
│   ├── FadingVideo.tsx    # 视频渐隐循环播放组件
│   └── LandingPage.tsx    # 主落地页（含全部区块）
├── public/
│   └── bg.mov             # Hero 背景视频
├── next.config.ts         # Next.js 配置
├── tsconfig.json          # TypeScript 配置
├── package.json           # 依赖与脚本
└── README.md              # 项目文档
```

---

## 🧩 页面区块

| 序号 | 区块 | 文件位置 | 说明 |
|------|------|---------|------|
| 1 | **Hero Section** | [LandingPage.tsx](file:///Users/a2333/IDE/dujiao-next-ws/token-api/components/LandingPage.tsx) `HeroSection()` | 品牌展示、核心价值主张、CTA 入口 |
| 2 | **功能展示区** | [LandingPage.tsx](file:///Users/a2333/IDE/dujiao-next-ws/token-api/components/LandingPage.tsx) `CapabilitiesSection()` | "为什么选择我们" + 三大功能卡片 |
| 3 | **模型卡片轮播** | [LandingPage.tsx](file:///Users/a2333/IDE/dujiao-next-ws/token-api/components/LandingPage.tsx) `ModelsSection()` | 8 品牌模型卡片，三行无缝循环轮播 |
| 4 | **订阅方案区** | [LandingPage.tsx](file:///Users/a2333/IDE/dujiao-next-ws/token-api/components/LandingPage.tsx) `PricingSection()` | 免费版 / Pro / Max / Ultra 四个套餐 |

### 交互特性

| 特性 | 说明 |
|------|------|
| **文本渐显动画** | `BlurText` 组件实现文字逐字渐显效果 |
| **模型卡片轮播** | 三行无限循环轮播，奇数行右→左，偶数行左→右，CSS transform 驱动无重排 |
| **液体玻璃效果** | 自定义 `liquid-glass` CSS 类，毛玻璃边框与渐变光晕 |
| **Hover 缩放** | 定价卡片 hover 时 scale(1.1) 平滑过渡，GPU 加速 |
| **视频背景** | `FadingVideo` 组件双缓冲无缝循环播放 |

---

## 🔌 API 接口文档

> ⚠️ **注意**: API 后端服务为独立项目，本文档描述前端预期的接口规范。

### 基础信息

- **Base URL**: `https://api.duji.com/v1`
- **Content-Type**: `application/json`
- **认证方式**: `Bearer Token` (API Key)
- **请求格式**: JSON
- **响应格式**: JSON

### 公共请求头

```http
Content-Type: application/json
Authorization: Bearer <your-api-key>
X-Request-ID: <uuid>
```

### 通用响应结构

```json
{
  "code": 0,
  "message": "success",
  "data": {},
  "request_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 接口列表

#### 1. 获取可用模型列表

```http
GET /v1/models
```

**响应示例**:

```json
{
  "code": 0,
  "data": {
    "models": [
      { "id": "claude-opus-4", "provider": "anthropic", "status": "active" },
      { "id": "gpt-5-turbo", "provider": "openai", "status": "active" },
      { "id": "gemini-2.5-pro", "provider": "google", "status": "active" }
    ]
  }
}
```

#### 2. 文本补全 (Chat Completion)

```http
POST /v1/chat/completions
```

**请求体**:

```json
{
  "model": "gpt-5-turbo",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello, world!" }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}
```

**响应示例**:

```json
{
  "code": 0,
  "data": {
    "id": "chatcmpl-abc123",
    "model": "gpt-5-turbo",
    "choices": [
      {
        "index": 0,
        "message": { "role": "assistant", "content": "Hello! How can I help?" },
        "finish_reason": "stop"
      }
    ],
    "usage": { "prompt_tokens": 10, "completion_tokens": 8, "total_tokens": 18 }
  }
}
```

#### 3. 获取用量统计

```http
GET /v1/usage?from=2025-01-01&to=2025-01-31
```

#### 4. 获取账户信息

```http
GET /v1/account
```

### 错误码

| HTTP 状态码 | 错误码 | 说明 |
|-----------|--------|------|
| 400 | `INVALID_REQUEST` | 请求参数校验失败 |
| 401 | `UNAUTHORIZED` | API Key 无效或已过期 |
| 403 | `FORBIDDEN` | 无权限访问目标资源 |
| 404 | `NOT_FOUND` | 资源不存在 |
| 429 | `RATE_LIMITED` | 请求频率超限 |
| 500 | `INTERNAL_ERROR` | 服务内部错误 |
| 503 | `SERVICE_UNAVAILABLE` | 上游模型服务暂不可用 |

### 重试策略

建议实现指数退避重试：

- 首次重试：等待 1s
- 二次重试：等待 2s
- 三次重试：等待 4s
- 最大重试次数：3 次

---

## 🧪 测试指南

### 开发中验证

```bash
# 启动开发服务器后进行以下验证：

# 1. 类型检查
npx tsc --noEmit

# 2. 构建检查
npm run build
```

### 功能测试清单

| 测试项 | 方法 | 预期结果 |
|--------|------|---------|
| **页面加载** | 浏览器访问 localhost:3000 | 页面无报错，所有区块正常渲染 |
| **视频背景** | 刷新页面观察背景 | 视频自动循环播放，无闪烁 |
| **文本动画** | 滚动至 Hero 区域 | 文字逐字渐显效果正常 |
| **模型轮播** | 观察第三区块轮播 | 三行卡片无缝循环，方向交替 |
| **卡片 Hover** | 鼠标悬停定价卡片 | 300ms 内 scale(1.1) 放大 |
| **响应式布局** | 调整浏览器宽度至 375px | 卡片竖排，导航栏折叠 |
| **性能指标** | Chrome DevTools → Performance | FPS ≥ 55，无重排警告 |

### 跨浏览器测试

```bash
# Chrome (推荐)
open -a "Google Chrome" http://localhost:3000

# Firefox
open -a Firefox http://localhost:3000

# Safari
open -a Safari http://localhost:3000
```

---

## 🚢 部署指南

### Vercel（推荐）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 部署
vercel --prod
```

### Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t duji-api .
docker run -p 3000:3000 duji-api
```

### 自托管 (Node.js)

```bash
# 构建
npm run build

# 使用 PM2 守护进程
npm install -g pm2
pm2 start npm --name "duji-api" -- start
pm2 save
pm2 startup
```

---

## 🤝 贡献规范

### 分支策略

```
main        → 生产分支（受保护）
├── develop → 开发分支
│   ├── feature/xxx  → 功能分支
│   ├── fix/xxx      → 修复分支
│   └── refactor/xxx → 重构分支
└── release/x.x.x    → 发布分支
```

### Commit 规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**类型说明**:

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `refactor` | 代码重构 |
| `style` | 样式调整 |
| `docs` | 文档更新 |
| `chore` | 构建/工具链变更 |
| `perf` | 性能优化 |
| `test` | 测试相关 |

**示例**:

```bash
git commit -m "feat(home): add hero section blur-text animation"
git commit -m "fix(carousel): resolve infinite scroll gap issue"
git commit -m "docs(readme): add deployment guide"
```

### 代码审查流程

1. 从 `develop` 创建功能分支
2. 提交代码并推送
3. 创建 Pull Request → `develop`
4. 确保通过 TypeScript 类型检查
5. 至少一位 Reviewer 批准
6. Squash Merge 至 `develop`

### 代码规范

- 遵循项目现有代码风格
- 不添加无意义的注释
- 组件 Props 必须定义 TypeScript 接口
- 优先使用 Tailwind 类名而非内联样式
- CSS 动画使用 `transform` 和 `opacity`（GPU 加速）

---

## 📄 许可证

本项目基于 **MIT License** 开源。

```
MIT License

Copyright (c) 2025 DujiAPI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: ...
```

---

## 📬 联系方式

| 渠道 | 信息 |
|------|------|
| **官方网站** | [https://duji.com](https://duji.com) |
| **API 文档** | [https://docs.duji.com](https://docs.duji.com) |
| **技术支持** | [support@duji.com](mailto:support@duji.com) |
| **GitHub** | [@duji-api](https://github.com) |

---

<div align="center">

**Made with ❤️ by Duji Team**

</div>

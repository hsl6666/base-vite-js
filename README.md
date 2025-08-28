# Vue 3 + JavaScript + Vite 基础框架

这是一个基于vue3的vite基础框架，旨在快速搭建临时性的小项目，解决每次项目从0到1的这个过程，下载此框架可以让你直接起手一个项目，不需要再做基础的项目配置，直接起手新建页面，使用tailwind.css快速构建页面，不用再考虑按需安装引入基础的依赖包的繁琐过程，满足你最基本的需求，达到完全的开箱即用！！！

测试upstream

## 项目结构

```
base-vite/
├── node_modules/ # 依赖包
├── public/ # 公共资源
├── src/ # 源代码
│ ├── assets/ # 静态资源
│ ├── components/ # Vue 组件
│ ├── router/ # 路由
│ ├── store/ # 状态管理
│ ├── App.vue # 根组件
│ └── main.js # 入口文件
├── .gitignore # Git 忽略文件
├── index.html # 入口 HTML 文件
├── package.json # 项目配置文件
└── vite.config.js # Vite 配置文件
```

## 技术栈总览

- **vite**: 用于构建用户界面。
- **vue-router**: 快速的前端构建工具。
- **axios**: 组件库，用于快速构建 UI。
- **Tailwind CSS**: 实用优先的 CSS 框架。
- **ECharts**: 数据可视化库。
- **Axios**: 用于发送 HTTP 请求。

## 环境要求

- Node.js 版本 >= 18.x
- pnpm 或 yarn

## 安装依赖

在项目根目录下，运行以下命令安装依赖：

```bash
pnpm install
```

开发
要启动开发服务器，请运行以下命令：

```bash
pnpm run dev
```

构建
要构建生产版本，请运行：

```bash
pnpm run build
```



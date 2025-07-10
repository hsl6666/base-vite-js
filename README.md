# Vue 3 + JavaScript + Vite 基础框架

这是一个快速搭建的基础框架，旨在快速搭建项目的基础框架，作为新时代的程序员，背代码是不可能的:smirk:，每次新玩一个技术栈都是从头开始看文档，从下载依赖，引入包，初始化...有时候可能有些小tip没有注意到，从引入包到引入demo还是多少要花一些时间的，在一次次这样的折腾中，我总结了出这套武功秘籍，我将以友好的文档倾其所有的告诉你怎么玩，快速的搭建出你老板要的基础框架

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



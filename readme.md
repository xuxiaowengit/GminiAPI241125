# OpenChat AI Web Data Analysis

这是一个基于Google Gemini AI的Web数据分析工具，用于处理和分析网络数据。

## 功能特点

- 支持多个Google Gemini API Key同时运行（当前支持5个Key并行）
- 自动数据采集和分析
- 错误请求自动记录和处理
- 数据累计统计功能

## 环境要求

- Node.js (推荐使用最新LTS版本)
- Yarn 包管理器

## 安装步骤

1. 克隆项目到本地
2. 安装依赖：
```bash
yarn install
```

## 主要依赖

- @google/generative-ai: ^0.12.0 - Google Gemini AI API
- axios: ^1.6.8 - HTTP 客户端
- puppeteer: ^22.8.0 - 网页自动化工具
- xlsx: ^0.18.5 - Excel文件处理
- moment: ^2.30.1 - 时间处理库

## 使用方法

1. 配置Google Gemini API Keys
2. 运行开发环境：
```bash
yarn dev
```

3. 构建项目：
```bash
yarn build
```
```bash
git fetch --all
git reset --hard origin/main 
```

## 项目结构

- `api/` - API相关代码
- `dataIn/` - 输入数据目录
- `plugins/` - 插件目录
- `dist/` - 构建输出目录
- `outExe/` - 执行输出目录

## 更新日志

### 2024-06-05
- 修复数据累计错误
- 修复错误请求未记录到表格的问题
- 优化为同时支持5个谷歌Gmini Key运行

## 开发工具配置

项目使用了以下开发工具：
- ESLint 用于代码检查
- Prettier 用于代码格式化
- Webpack 用于代码构建
- Gulp 用于自动化任务

## 注意事项

- 使用前请确保已正确配置Google Gemini API Keys
- 建议定期备份数据
- 如遇到API限制，请适当调整并发请求数量

## 许可证

[添加您的许可证信息]

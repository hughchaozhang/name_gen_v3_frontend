# Name Wok - 智能英文转中文姓名推荐系统

这是一个基于 AI 的智能姓名推荐系统，帮助外国友人选择富有文化内涵的中文名字。

## 功能特点

- 智能名字生成：根据英文名智能推荐中文名字
- 文化解读：为每个推荐名字提供详细的文化内涵解释
- 一键复制：支持快速复制中文名和拼音
- 响应式设计：适配各种设备屏幕

## 技术架构

- 前端框架：Hono + React
- 样式：CSS3 (Flexbox/Grid)
- 部署平台：Cloudflare Pages
- API：Cloudflare Workers

## 项目结构

```
.
├── README.md          # 项目说明文档
├── public/           # 静态资源目录
│   └── static/      
│       └── style.css # 全局样式文件
├── src/             # 源代码目录
│   ├── index.tsx    # 应用入口
│   └── renderer.tsx # 渲染相关代码
└── requirements/    # 需求文档目录
```

## 页面布局

### 主页面结构
- 顶部：网站 Logo 和名称 (Name Wok)
- 中部：
  - 输入区域：英文名输入框
  - 示例卡片：展示名字推荐效果
- 结果区域：
  - 名字推荐卡片（最多3个）
  - 每个卡片包含：
    * 中文名和拼音（右上角支持一键复制）
    * 名字含义解释
    * 文化内涵说明
    * 英文翻译

## API 接口

### 生成名字接口
- URL: `https://name-gen-v3.hughzhang.workers.dev/api/generate`
- 方法: POST
- 请求格式:
```json
{
  "firstName": "英文名"
}
```
- 响应格式:
```json
{
  "names": [
    {
      "chineseName": "中文名",
      "pinyin": "拼音",
      "meaning": "含义解释",
      "culturalReference": "文化参考",
      "englishMeaning": "英文解释"
    }
  ]
}
```

## 开发指南

1. 安装依赖
```bash
bun install
```

2. 本地开发
```bash
bun run dev
```

3. 构建部署
```bash
bun run build
```
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
│       └── css/     # CSS 样式目录
│           ├── main.css           # 主样式文件，导入其他所有样式
│           ├── base/             # 基础样式
│           │   └── reset.css     # 重置样式和全局变量
│           ├── layout/           # 布局相关样式
│           │   └── header.css    # 头部布局样式
│           ├── components/       # 组件样式
│           │   ├── name-card.css    # 名字卡片样式
│           │   ├── input-section.css # 输入区域样式
│           │   └── loading.css       # 加载动画样式
│           └── animations/       # 动画样式
│               └── animations.css # 全局动画定义
├── src/             # 源代码目录
│   ├── index.tsx    # 应用入口文件
│   ├── namewok.tsx  # 名字推荐卡片组件
│   └── renderer.tsx # 渲染相关代码
└── requirements/    # 需求文档目录
```

## 样式架构

项目采用模块化的 CSS 架构，遵循以下原则：

1. **基础样式 (Base)**
   - 重置默认样式
   - 定义全局变量（颜色、间距等）
   - 设置基础字体和布局

2. **布局组件 (Layout)**
   - 处理页面级的布局结构
   - 包含响应式设计规则

3. **UI组件 (Components)**
   - 独立的组件级样式
   - 每个组件都有自己的样式文件

4. **动画 (Animations)**
   - 集中管理所有动画效果
   - 确保动画的一致性

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
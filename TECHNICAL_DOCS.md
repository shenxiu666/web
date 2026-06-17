# doyoudo 网站克隆项目 - 技术架构与文件结构详解

## 📋 项目概述

**项目名称**: doyoudo 网站克隆  
**目标网站**: www.doyoudo.com  
**项目定位**: 创意设计软件在线学习平台前端静态页面克隆  
**技术特点**: 纯前端实现、模块化架构、无构建工具依赖

---

## 🏗️ 完整文件结构

```
/workspace/
├── index.html                  # 首页 - 展示热门课程和学习路径
├── tutorials.html              # 教程列表页 - 支持筛选/搜索/分页
├── tutorial-detail.html        # 课程详情页 - 视频播放器/章节/评论
├── learning-path.html          # 学习路径页 - 系统性学习路线图
├── free-fonts.html             # 免费字体资源页 (附加页面)
├── resources.html              # 资源下载页 (附加页面)
│
├── css/                        # 样式模块目录 (8 个 CSS 文件)
│   ├── reset.css               # 全局重置和基础样式 (941B)
│   ├── navbar.css              # 导航栏样式 (1KB)
│   ├── home.css                # 首页/Banner/搜索/筛选区样式 (4.3KB)
│   ├── cards.css               # 课程卡片通用样式 (1.8KB)
│   ├── detail.css              # 课程详情页专用样式 (3.9KB)
│   ├── paths.css               # 学习路径卡片样式 (1.5KB)
│   ├── footer.css              # 页脚样式 (732B)
│   ├── responsive.css          # 响应式适配样式 (3KB)
│   └── style.css               # 旧版合并文件 (保留兼容)
│
├── js/                         # JavaScript 模块目录 (8 个 JS 文件)
│   ├── data.js                 # 共享数据层 (课程/路径/软件列表)
│   ├── utils.js                # 通用工具函数 (数据访问/URL 生成)
│   ├── components.js           # UI 组件 (课程卡片 HTML 生成器)
│   ├── ui.js                   # 通用 UI 逻辑 (导航/搜索/Footer 初始化)
│   ├── home.js                 # 首页业务逻辑 (热门课程/路径预览)
│   ├── tutorials.js            # 教程列表页逻辑 (筛选/搜索/分页)
│   ├── detail.js               # 课程详情页逻辑 (Tab 切换/章节渲染)
│   ├── paths.js                # 学习路径页逻辑 (路径卡片渲染)
│   └── main.js                 # 旧版主入口文件 (保留兼容)
│
├── assets/                     # 静态资源目录
│   └── images/                 # 图片资源
│       ├── web-logo.png        # 网站 Logo (712×158px)
│       ├── banner.jpg          # 首页 Banner (1622×1210px)
│       └── courses/            # 课程封面图片目录
│
├── PROJECT.md                  # 项目设计文档 (设计系统/颜色/尺寸规范)
├── README.md                   # 项目简介
└── 项目需求.md                  # 原始需求文档
```

---

## 🎯 技术栈详解

### 核心技术栈

| 类别 | 技术选型 | 说明 |
|------|----------|------|
| **HTML** | HTML5 语义化标签 | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` |
| **CSS** | 原生 CSS3 | 模块化拆分、Flexbox 布局、CSS 变量思想 |
| **JavaScript** | ES6+ 原生 JS | 模块化架构、箭头函数、模板字符串、解构赋值 |
| **图标库** | Remix Icon CDN | `https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css` |
| **字体** | 系统字体栈 | `PingFang SC, Microsoft YaHei, sans-serif` |

### 架构模式

```
┌─────────────────────────────────────────────────────┐
│                    HTML Pages                        │
│  (index/tutorials/detail/paths)                     │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                   CSS Modules                        │
│  reset → navbar → home/detail/paths → cards → footer│
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                  JavaScript Layers                   │
│  ┌──────────────────────────────────────────────┐   │
│  │              Data Layer                       │   │
│  │  data.js (coursesData, learningPathsData)    │   │
│  └──────────────────────────────────────────────┘   │
│                      │                               │
│                      ▼                               │
│  ┌──────────────────────────────────────────────┐   │
│  │            Utility Layer                      │   │
│  │  utils.js (getCourses, getCoverUrl, etc.)    │   │
│  └──────────────────────────────────────────────┘   │
│                      │                               │
│                      ▼                               │
│  ┌──────────────────────────────────────────────┐   │
│  │          Component Layer                      │   │
│  │  components.js (generateCourseCard HTML)     │   │
│  └──────────────────────────────────────────────┘   │
│                      │                               │
│                      ▼                               │
│  ┌──────────────────────────────────────────────┐   │
│  │             UI Layer                          │   │
│  │  ui.js (nav/search/footer initialization)    │   │
│  └──────────────────────────────────────────────┘   │
│                      │                               │
│                      ▼                               │
│  ┌──────────────────────────────────────────────┐   │
│  │         Page-Specific Logic                   │   │
│  │  home.js / tutorials.js / detail.js / paths.js│   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 📄 页面功能详解

### 1. 首页 (`index.html`)

**引用资源**:
- CSS: `reset.css`, `navbar.css`, `home.css`, `cards.css`, `footer.css`, `responsive.css`
- JS: `data.js`, `utils.js`, `components.js`, `ui.js`, `home.js`

**核心功能**:
- 导航栏 (Logo + 6 菜单项 + beta 标签)
- Banner 展示区 (大图 792×297 + 小图 396×297)
- 快速搜索框 (支持回车跳转列表页)
- 快捷按钮组 (全部课程/付费课程/企业合作)
- 软件/难度筛选栏
- 热门课程卡片网格 (4 列布局)
- 学习路径预览卡片
- Footer (ICP 备案信息)

### 2. 教程列表页 (`tutorials.html`)

**引用资源**:
- CSS: `reset.css`, `navbar.css`, `home.css`, `cards.css`, `footer.css`, `responsive.css`
- JS: `data.js`, `utils.js`, `components.js`, `ui.js`, `tutorials.js`

**核心功能**:
- 继承首页的搜索和筛选区
- 增加类型筛选 (全部/免费/付费)
- 排序下拉框 (最新/最热/评分)
- 搜索结果高亮显示
- 智能分页器 (支持省略号逻辑)
- URL 参数同步 (`?software=ps&difficulty=beginner&search=xxx&page=2`)
- 空状态提示

### 3. 课程详情页 (`tutorial-detail.html`)

**引用资源**:
- CSS: `reset.css`, `navbar.css`, `detail.css`, `cards.css`, `footer.css`, `responsive.css`
- JS: `data.js`, `utils.js`, `components.js`, `ui.js`, `detail.js`

**核心功能**:
- 面包屑导航
- 视频播放器模拟 (16:9 比例，进度条 + 控制条)
- 课程元信息 (标题/软件/难度/作者/时长/课时/评分)
- Tab 切换系统 (课程简介/课程目录/学员评论)
- 章节列表渲染 (绿色当前高亮)
- 侧边栏信息摘要
- 作者卡片展示
- 相关推荐课程 (底部 4 列卡片)

### 4. 学习路径页 (`learning-path.html`)

**引用资源**:
- CSS: `reset.css`, `navbar.css`, `paths.css`, `footer.css`, `responsive.css`
- JS: `data.js`, `utils.js`, `ui.js`, `paths.js`

**核心功能**:
- 页面标题和描述
- 软件筛选标签 (全部/PS/AE/PR/C4D/AI/AU/FL/FCP)
- 路径卡片 (2 列布局)
- 阶段流程可视化 (入门→核心→进阶→精通)
- 课时统计展示
- 空状态提示 (建设中)

---

## 🎨 设计系统 (从原站 CSS 逆向提取)

### 颜色系统

| 令牌 | 色值 | 用途 |
|------|------|------|
| **品牌绿** | `#a2c217` | 主按钮、筛选激活态、hover 高亮 |
| hover 绿 | `#94b113` / `#95b312` | 按钮 hover、导航 hover |
| 深绿 | `#80aa15` | 标签文字、筛选标题 |
| 免费按钮 | `#9eb80c` | 免费课程 CTA |
| 付费按钮 | `#eb5f35` | 付费课程 CTA |
| 企业按钮 | `#477fe9` | 企业合作按钮 |
| 文字色 | `#4d4d4d` | 全局正文 (非纯黑) |
| 标题色 | `#2a301b` | 卡片标题 |
| 辅助色 | `#707070` | 次要信息 |
| placeholder | `#acacac` | 搜索框占位文字 |
| 页面背景 | `rgba(245,246,249,0.97)` | 全局背景 |
| 卡片背景 | `#fff` | 白色卡片 |
| 标签背景 | `#efeff0` | 软件/难度标签 |

### 阴影系统

| 场景 | 值 |
|------|-----|
| 卡片默认 | `0 1px 2px 0 rgba(0,0,0,0.01), 0 4px 8px 0 rgba(0,0,0,0.05)` |
| 卡片 hover | `0 15px 50px 0 rgba(0,0,0,0.09), 0 15px 59px 0 rgba(0,0,0,0.09)` |
| Banner | `0 1px 3px 0 rgba(0,0,0,0.1)` |
| 搜索框 | `0 1px 2px 0 rgba(0,0,0,0.07)` |

### 圆角规范

| 元素 | 值 |
|------|-----|
| 标签 | `3px` |
| 卡片 | `4px` |
| 按钮/搜索框 | `5px` |
| Banner | `6px` |
| 药丸按钮 | `100px` |

### 尺寸规范

| 元素 | 尺寸 |
|------|------|
| 导航栏高度 | `72px` |
| Logo 宽度 | `120px` |
| 容器最大宽度 | `1240px` |
| 课程卡片宽度 | `294px` |
| 课程封面高度 | `166px` |
| Footer 高度 | `120px` |

---

## 📱 响应式设计

### 断点策略

| 断点 | 适配策略 |
|------|----------|
| **>1024px** | 桌面端：4 列卡片，1240px 容器，72px 导航 |
| **471-1024px** | 平板端：3 列卡片，导航换行，Banner 缩小 |
| **≤470px** | 移动端：1 列卡片，搜索按钮全宽，Footer 堆叠 |

### 响应式实现

```css
/* responsive.css 核心断点 */
@media (max-width: 1024px) {
  /* 平板适配：3 列卡片 */
}

@media (max-width: 768px) {
  /* 小平板：导航简化 */
}

@media (max-width: 470px) {
  /* 手机端：单列布局 */
}
```

---

## 🔧 核心功能实现

### 1. 数据层 (`js/data.js`)

```javascript
// 课程数据结构
const coursesData = [
  {
    id: 1,
    title: '最容易听懂的 PS 入门教程',
    software: 'ps',
    difficulty: 'beginner',
    author: '李涛',
    duration: '8 小时',
    lessons: 48,
    views: 125000,
    isFree: true,
    price: 0,
    rating: 4.9,
    cover: 'courses/course-01.jpg',
    desc: '课程描述...',
    chapters: [{title: '章节名', dur: '18:30'}],
    relatedIds: [2, 3, 9, 16]
  }
];

// 学习路径数据
const learningPathsData = [...];

// 软件列表
const softwareList = [
  {id:'all', name:'全部'},
  {id:'ps', name:'PS'},
  {id:'ae', name:'AE'},
  // ...
];
```

### 2. 工具层 (`js/utils.js`)

```javascript
// 获取课程数据
function getCourses(filters = {}) { ... }

// 获取单个课程
function getCourseById(id) { ... }

// 生成封面 URL
function getCoverUrl(course) { ... }

// 设置元素内容
function setText(elId, text) { ... }

// 搜索课程
function searchCourses(query) { ... }
```

### 3. 组件层 (`js/components.js`)

```javascript
// 生成课程卡片 HTML
function generateCourseCard(course) {
  return `
    <div class="course-card">
      <div class="card-cover">${getCoverHtml(course)}</div>
      <div class="card-info">
        <h3>${course.title}</h3>
        <div class="tags">...</div>
        <div class="meta">...</div>
      </div>
    </div>
  `;
}
```

### 4. 搜索功能 (`js/tutorials.js` + `js/ui.js`)

```javascript
// 搜索状态管理
const filterState = {
  software: 'all',
  difficulty: '',
  type: 'all',
  sort: 'latest',
  search: '',  // 搜索关键词
  page: 1
};

// 搜索过滤逻辑
function updateResults() {
  let results = getCourses(filterState);
  
  // 搜索过滤
  if (filterState.search) {
    const q = filterState.search.toLowerCase();
    results = results.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.author.toLowerCase().includes(q) ||
      c.software.toLowerCase().includes(q)
    );
  }
  
  renderCards(results);
}
```

### 5. URL 参数同步

```javascript
// 读取 URL 参数
const params = new URLSearchParams(window.location.search);
filterState.search = params.get('search') || '';
filterState.software = params.get('software') || 'all';
filterState.difficulty = params.get('difficulty') || '';
filterState.page = parseInt(params.get('page')) || 1;

// 更新 URL (不刷新)
function updateURL() {
  const params = new URLSearchParams(filterState);
  history.pushState({}, '', '?' + params.toString());
}
```

---

## 🚀 快速启动

```bash
# 方式一：直接打开
双击 index.html

# 方式二：本地服务器
cd /workspace
python -m http.server 8080
# 浏览器访问 http://localhost:8080

# 方式三：Node.js 服务器
npx serve /workspace
```

---

## 📊 代码统计

| 类型 | 文件数 | 总大小 | 说明 |
|------|--------|--------|------|
| HTML | 6 个 | ~45KB | 4 个主页面 + 2 个附加页面 |
| CSS | 8 个 | ~17KB | 模块化样式 (不含旧版 style.css) |
| JS | 8 个 | ~28KB | 分层架构 (不含旧版 main.js) |
| 图片 | 若干 | ~2MB | Logo/Banner/课程封面 |

---

## ✅ 项目亮点

1. **模块化架构**: CSS 和 JS 均按功能和页面拆分，便于维护和扩展
2. **零依赖**: 无需 npm、webpack 等构建工具，双击即可运行
3. **精确克隆**: 品牌色、尺寸、字体、阴影均从原站 CSS 逆向提取
4. **响应式完整**: 覆盖桌面/平板/手机三种视口
5. **交互丰富**: 筛选/搜索/分页/Tab 切换/URL 同步全部实现
6. **真实数据**: 16 门真实课程数据 + 8 条学习路径
7. **SEO 友好**: 语义化 HTML 标签，结构化数据
8. **无障碍**: 合理的标签嵌套和 alt 属性

---

## 🔄 版本历史

- **v1.0**: 初始版本，单文件 CSS/JS
- **v2.0**: CSS 模块化拆分 (8 个文件)
- **v3.0**: JS 分层架构拆分 (8 个文件)
- **v3.1**: 修复搜索功能，支持关键词搜索和 URL 同步

---

## 📝 开发规范

### CSS 命名约定
- 使用 BEM 思想：`.block__element--modifier`
- 页面特定样式加前缀：`.home-banner`, `.detail-player`
- 通用组件无前缀：`.course-card`, `.btn`

### JS 命名约定
- 数据层：`coursesData`, `learningPathsData` (常量用 PascalCase)
- 函数：`getCourses()`, `renderCards()` (驼峰命名)
- 状态：`filterState` (对象存储页面状态)

### 文件组织
- CSS 按**功能模块**拆分，而非页面
- JS 按**职责分层**拆分 (数据/工具/组件/UI/页面逻辑)
- 每个页面只引用必需的 CSS/JS 模块

---

## 🎯 后续优化方向

1. **性能优化**: 图片懒加载、CSS 压缩、JS 异步加载
2. **PWA 支持**: Service Worker、离线缓存
3. **动画增强**: 页面过渡、卡片悬浮动效
4. **深色模式**: CSS 变量实现主题切换
5. **国际化**: i18n 多语言支持
6. **构建工具**: 引入 Vite 进行打包优化

---

*本文档最后更新：2024 年*

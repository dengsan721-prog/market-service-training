# 7天训练营与合作伙伴面试流程更新 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将参考站最新的 7 天训练营课程正文同步到目标站镜子库，并在“大流程 → 合作伙伴”中展示驿站主面试流程图。

**Architecture:** 保留目标站现有单页 HTML 和 `manualData` 内嵌数据结构。使用可重复运行的同步脚本更新 `rawCamp7` 和 `masterFlow` 的图片元数据，用少量渲染代码把图片显示在合作伙伴阶段卡中。

**Tech Stack:** 原生 HTML/CSS/JavaScript、Node.js ES modules、GitHub Pages 静态资源。

**Spec:** `docs/superpowers/specs/2026-11-12-camp7-partner-interview-design.md`

## Global Constraints

- 仅同步参考站 `data/camp7-course.txt` 对应的 7 天训练营课程正文，保留目标站原有的前置服务标准和其它模块。
- 不整体覆盖参考站，不改目标站其它镜子库模块。
- 不改变用户提供图片中的文字内容；图片作为静态资源随站点发布。
- 使用现有无构建依赖的单页实现；不新增运行时依赖。
- 目标站的图片路径使用相对路径，保证 GitHub Pages 子路径部署可用。

## Review Focus

- 课程正文是否只替换 `rawCamp7`，并保留原有标准前缀；测试：比较同步前后的 `rawSalon`、`rawTalent`、`rawOther` 内容不变。
- 课程源文本是否完整包含开营和 7 个训练日；测试：同步脚本要求匹配 8 个 `🌲` 标题。
- 合作伙伴图片是否只出现在第 05 阶段且路径可访问；测试：解析 `manualData.masterFlow` 与图片文件存在性。
- 图片在窄屏下是否不溢出；测试：CSS 使用 `max-width: 100%`，再用本地预览检查 420px 视口。
- 现有交互是否仍完整；测试：运行 `node scripts/check-interaction-structure.mjs`。

### Task 1: 准备可重复的课程与图片同步源

**Files:**
- Create: `data/camp7-course.txt`（从参考站复制）
- Create: `assets/camp7-essay.jpg`（从参考站复制）
- Create: `assets/camp7-review-example.jpg`（从参考站复制）
- Create: `scripts/update-camp7-content.mjs`
- Create: `scripts/check-camp7-partner-update.mjs`
- Modify: `index.html`（由同步脚本更新 `manualData`）

**Interfaces:**
- Consumes: 参考站 `data/camp7-course.txt` 与两张 7 天训练营配图。
- Produces: `rawCamp7` 的完整课程正文和 `images` 元数据；目标站其它 `manualData` 字段保持不变。

- [ ] **Step 1: 添加同步验收脚本并运行一次，确认当前目标站缺少新版内容时失败**

  验收脚本解析 `index.html` 的 `manualData`，检查开营 + 7 个训练日标题、两张课程配图和第 05 阶段图片字段。

  Run: `node scripts/check-camp7-partner-update.mjs`

  Expected: FAIL，指出课程标题或合作伙伴图片元数据尚未存在。

- [ ] **Step 2: 复制参考站课程源文件和配图**

  将参考站 `data/camp7-course.txt`、`assets/camp7-essay.jpg`、`assets/camp7-review-example.jpg`复制到目标站对应路径；不改写源文本。

- [ ] **Step 3: 创建 `scripts/update-camp7-content.mjs`**

  复用参考站同步逻辑：读取源文本，验证恰好存在 8 个 `🌲` 标题；定位 `rawCamp7` 的标准正文边界；保留边界前内容，将源课程正文接在后面；写入两张配图的相对路径；同时给 `masterFlow` 中 `number === '05'` 的阶段写入 `image: { src: 'assets/station-master-interview.png', alt: '驿站主面试流程' }`；序列化时转义 `<`。

- [ ] **Step 4: 运行同步脚本并重新运行验收脚本**

  Run: `node scripts/update-camp7-content.mjs data/camp7-course.txt`

  Expected: 输出已更新 8 个课程段落且保留既有标准；随后 `node scripts/check-camp7-partner-update.mjs` 为 PASS。

### Task 2: 接入合作伙伴阶段的图片渲染

**Files:**
- Create: `assets/station-master-interview.png`（用户提供的图片）
- Modify: `index.html`：阶段图片样式与 `renderMasterStage()` 渲染逻辑

**Interfaces:**
- Consumes: Task 1 写入的 `stage.image` 对象。
- Produces: 合作伙伴阶段中可见、可点击查看原图的响应式图片块。

- [ ] **Step 1: 在 `index.html` 的样式区增加 `.stage-image` 样式**

  图片块占据整行；图片 `display: block`、`width: 100%`、`max-width: 100%`、`height: auto`，沿用现有卡片圆角和边框，确保窄屏不横向溢出。

- [ ] **Step 2: 增加 `renderStageImage(image)` 并接入 `renderMasterStage()`**

  空值时返回空字符串；有值时渲染标题、`alt`、相对路径图片和“查看原图”链接，并对文本和 URL 使用现有 `safeHtml()`。

- [ ] **Step 3: 添加用户图片并运行本地结构验收**

  将用户附件复制为 `assets/station-master-interview.png`，确认渲染代码引用的路径与文件名一致。

  Run: `node scripts/check-interaction-structure.mjs`

  Expected: PASS，且图片文件存在。

### Task 3: 本地预览与最终验证

**Files:**
- Modify: `scripts/check-camp7-partner-update.mjs`（仅在验收规则需要调整时）

**Interfaces:**
- Consumes: 已更新的 `index.html`、静态资源和验收脚本。
- Produces: 可在 GitHub Pages 子路径运行的静态页面。

- [ ] **Step 1: 启动本地静态服务器并检查两个入口**

  用现有本地预览方式启动站点，打开目标页；切换到“镜子库 → 7天训练营”，确认新版开营及第 1～7 天内容；切换到“大流程 → 合作伙伴”，确认图片可见并可打开原图。

- [ ] **Step 2: 检查窄屏布局**

  在约 420px 宽视口检查图片、阶段卡和内容切换无横向滚动，中文标题和正文可读。

- [ ] **Step 3: 运行完整验证命令**

  Run: `node scripts/check-camp7-partner-update.mjs; node scripts/check-interaction-structure.mjs`

  Expected: 两个命令均以退出码 0 完成，无失败项。

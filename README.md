# Love Overflows 零代码定制指南

这是一份面向没有代码基础用户的说明书。你只需要按步骤修改图片和文字，就能定制出属于你自己的“暖心弹窗 + 手提包收纳”效果。

> 建议先备份整个文件夹，以便出问题时可以恢复。

## 文件结构

- `index.html`：页面结构（包含手提包和提示文字）。
- `style.css`：页面样式与动画（弹窗、手提包、提示文字）。
- `script.js`：弹窗生成、拖拽、吸入手提包、点击手提包吸入所有等交互逻辑。
- `images/`：图片素材（弹窗缩略图与手提包图标）。

## 如何预览

- 方式一：双击 `index.html` 即可在浏览器打开并预览。
- 方式二：使用本地预览地址 `http://localhost:8000/`（如果你已运行本地服务）。

## 快速修改（你最可能需要做的）

- 更换弹窗文案：`script.js` → 顶部 `messages` 数组。
- 更换弹窗图片：把你的图片放到 `images/` 并将图片命名改为 `01.png`、`02.png`…，或修改 `script.js` → `imagePaths`。
- 如需更换手提包图标：替换 `images/handbag.png`，或改 `style.css` 中 `#handbag` 的 `background`。
- 修改手提包提示文字：`index.html` → `#handbag-note` 内容（默认“我收到啦”）。
- 调整出现速度与时长：`script.js` → `delayMin/delayRange`；`style.css` → `--popup-duration`。
- 调整吸入动画：`script.js` → `absorbIntoBag` 的参数（速度、缩小比例、是否曲线、是否抖动闪光）。

---

## 更换弹窗图片

### 方法一（最简单）

把你的图片直接替换 `images/` 目录中的 `01.png`、`02.png`…（文件名保持不变）。弹窗会自动随机显示这些图片。

### 方法二（自定义文件名）

1. 打开 `script.js`，搜索 `imagePaths`。
2. 把这行改成你的图片列表，例如：

```js
const imagePaths = [
  "images/cat.png",
  "images/flower.jpg",
  "images/heart.png",
];
```

建议尺寸：正方形或接近正方形（如 256×256）。文件名不要有空格；尽量使用 PNG/JPG。

## 更改弹窗文字内容

位置：`script.js` 顶部 `messages` 数组。把引号内的文字改成你喜欢的内容，支持 Emoji。

示例：

```js
const messages = [
  "今天要开心哦 (◕‿◕✿)",
  "早点睡觉呀",
  "多喝水呀",
];
```

注意：

- 每条文案用引号包裹。
- 每条之间用逗号分隔。
- 最后一条不要多加逗号（避免报错）。

## 更换手提包图标

- 直接用你的图片替换 `images/handbag.png`（保持同名）。
- 或在 `style.css` 中搜索 `#handbag`，把 `background: url('images/handbag.png')` 改为你的文件路径。

## 修改手提包提示文字（“我收到啦”）

- 位置：`index.html` 中 `#handbag-note` 元素。
- 做法：把文字改成你喜欢的文案（例如“投递成功”）。
- 显示规则：鼠标悬停在手提包上时显示。如果要调整位置或样式，修改 `style.css` 中 `#handbag-note` 的样式即可。

## 调整弹窗出现速度与显示时长

### 出现速度（频率）

- 位置：`script.js` → 在 `startPopups()` 里搜索 `delayMin` 和 `delayRange`。
- 说明：
  - `delayMin` 越小，弹出越快。
  - `delayRange` 越小，间隔越稳定。
- 示例：把 `delayMin` 改为 `60` 或 `40`，`delayRange` 改为 `180` 或 `120`。

### 单个弹窗的显示时长

- 位置：`style.css` 顶部变量 `--popup-duration`（单位秒）。
- 当前默认值：`--popup-duration: 8s;`。按需改为 `10s`、`12s` 或更长。

## 拖拽与靠近手提包的效果

- 拖拽边界安全距离：`script.js` → 在 `enableDrag()` 搜索 `margin = 6`，改为更大数值可避免太靠边。
- 拖拽层级：`style.css` → `.popup.dragging { z-index: 50; }`，保证拖拽中的弹窗在最上层。
- 靠近手提包时缩小：`style.css` → `.popup.over-bag .popup-content { transform: scale(0.88) }`，改为更小（如 `0.80`）缩小更多。

## 手提包出现与点击吸入规则

- 手提包延迟出现：`script.js` 中搜索 `bag-visible` 加载处，把 `3000` 改为你想要的毫秒数（例如 `2000` 表示 2 秒后出现）。
- 点击手提包吸入所有弹窗：`script.js` 搜索 `handbag.addEventListener('click'`。
  - 可调参数：
    - `duration`：吸入速度（秒），数值越小越快。
    - `scale`：吸入后缩小到的比例（例如 `0.12`）。
    - `curve`：是否使用轻微曲线（`true/false`）。
    - `celebrate`：吸入后手提包是否抖动/闪光（`true/false`）。

## 吸入动画（单个弹窗）

位置：`script.js` → `function absorbIntoBag(popup, opts = {})`。

可传参数：

- `duration`：吸入动画时长（默认 `0.45` 秒）。
- `scale`：最终缩小的比例（默认 `0.25`）。
- `curve`：是否使用轻微曲线（默认 `true`）。
- `celebrate`：吸入后是否触发手提包抖动/闪光（默认 `true`）。

曲线强度：函数里有控制点 `ctrlX/ctrlY` 的计算，想让曲线更明显可把 `-120` 调大（如 `-160`），或增大左右随机范围（`±60` 改成 `±100`）。

## 手提包抖动与闪光

- 抖动动画：`style.css` → `@keyframes bagShake`（旋转与缩放的幅度）。
- 闪光覆盖层：`style.css` → `#handbag::after` 与 `@keyframes flashOverlay`（闪光强度与时长）。
- 如果不想要庆祝效果：在 `script.js` 的吸入参数里把 `celebrate` 设为 `false`。

## 提示文字显示（“我收到啦”）

- 样式位置：`style.css` → `#handbag-note`。
- 悬停显示规则：`#handbag:hover ~ #handbag-note { ... }`。
- 想在移动端也显示：可在手提包出现后，临时给 `#handbag-note` 加一个类（例如 `note-visible`），让它淡入 1～2 秒后再淡出。

## 背景与字体（可选美化）

- 背景渐变：`style.css` → `body { background: ... }`，可替换为你喜欢的渐变或纯色。
- 字体：`style.css` → 搜索 `font-family`，改成系统已有字体（如 `Microsoft Yahei`、`PingFang SC`）。
- 页面图标：`index.html` → `<link rel="icon">`，可替换为你的图标地址或本地图片路径。

## 常见问题排查

- 图片不显示：
  - 文件是否放在 `images/` 里；路径是否正确；大小写是否匹配。
  - 文件名不要有空格；尽量使用 PNG/JPG。
- 文案不显示或报错：
  - `messages` 数组格式是否正确：每条用引号包裹、逗号分隔，最后一条不要多逗号。
- 手提包没出现：
  - 默认 3 秒后出现；确认 `style.css` 中 `#handbag` 与 `#handbag.bag-visible` 未被改为不可见。
- 拖拽卡顿：
  - 图片过大影响性能；建议控制在几百 KB 内。

## 安全编辑建议

- 每次只改少量内容，并预览确认再继续。
- 如果修改后出现异常，优先恢复到上一次可以正常工作的状态（用备份文件夹）。
- 不确定如何修改时，可以通过“搜索关键词”定位：
  - 文案：搜索 `messages`。
  - 图片列表：搜索 `imagePaths`。
  - 手提包延迟出现：搜索 `bag-visible` 或 `3000`。
  - 吸入动画：搜索 `absorbIntoBag`。
  - 点击手提包：搜索 `handbag.addEventListener('click'`。

## 最新交互与修改位置（完整汇总）

- 拖拽到手提包上方立刻缩小：
  - 样式位置：`style.css` → `.popup.over-bag .popup-content { transform: scale(0.88) }`
  - 说明：只缩放内部内容，避免与父级动画冲突；可把 `0.88` 改为更小。
- 拖拽中弹窗置顶：
  - 样式位置：`style.css` → `.popup.dragging { z-index: 50; }`
  - 说明：拖动时位于最上层，避免被其他弹窗或手提包遮挡。
- 手提包 3 秒后淡入：
  - 脚本位置：`script.js` → `window.addEventListener('load', ...)` 内的 `setTimeout(..., 3000)`；把 `3000` 改为需要的毫秒数。
- 点击手提包吸纳所有弹窗：
  - 脚本位置：`script.js` → `handbag.addEventListener('click', ...)`
  - 可调参数：`duration`（速度，秒）、`scale`（缩小倍数）、`curve`（曲线开关）、`celebrate`（抖动闪光）。
- 手提包抖动与闪光：
  - 样式位置：`style.css` → `#handbag.celebrate`、`@keyframes bagShake`、`@keyframes flashOverlay`。
  - 触发位置：`script.js` → `triggerBagCelebrate()` 在吸入完成后调用。
- 手提包提示文字“我收到啦”：
  - 结构位置：`index.html` → `#handbag-note`。
  - 样式位置：`style.css` → `#handbag-note` 与 `#handbag:hover ~ #handbag-note`。
- 点击弹窗立即消失（淡出 + 缩小）：
  - 脚本位置：`script.js` → `createPopup(...)` 中的点击事件与 `dismissPopup(...)` 函数。
  - 样式位置：`style.css` → `.popup.dismissed`（控制点击后的过渡）。
  - 可调参数：在 `dismissPopup(popup, { duration, scale })` 中调整，默认 `duration: 0.22` 秒，`scale: 0.85`。
- 拖拽后非手提包区域不立即消失（防误触）：
  - 脚本位置：`script.js` → 拖拽结束时记录 `popup.__lastDragEndAt`，点击时忽略 **250ms** 内的“尾随点击”。
  - 如需更敏感或更稳妥，可把 `250ms` 改为 `200ms/300ms`。
- 吸入动画使用曲线飞行：
  - 脚本位置：`script.js` → `absorbIntoBag(...)` 使用 `requestAnimationFrame` + 二次贝塞尔曲线。
  - 可调控制点（曲线强度）：修改函数中的 `ctrlX/ctrlY` 偏移（默认中点左右 ±60 像素、向上 120 像素）。

## 进一步可改进的方向（建议）

- 性能优化：
  - 运动位置改为 `transform: translate(...)` 而非 `left/top`，减少布局开销（需要同步调整定位逻辑）。
  - 图片预加载与压缩（`images/` 资源控制在几百 KB 内）。
  - 限制同时在屏幕上的弹窗数量（例如最多 20 个），超出时暂缓新弹窗。
  - 仅在拖拽或过渡期间使用 `will-change`，结束后移除，避免浏览器过度优化占用内存。
- 交互与动效：
  - 吸入时增加粒子/爱心碎片特效（CSS 或轻量 Canvas）。
  - 吸入完成可选播放轻音效（支持开关与音量设置）。
  - 近包距离渐变缩小（根据距离动态调整 `scale` 而非固定 0.88）。
  - 移动端无悬停：为手提包提示文字添加“出现后短暂显示”的策略或长按显示。
- 可访问性（A11y）：
  - 为手提包添加 `role="button"` 与 `aria-label`，并允许键盘触发（回车/空格）。
  - 遵循 `prefers-reduced-motion`：如果用户偏好减少动画，则降低动画强度或时长。
  - 给弹窗图片添加可读的替代文本（例如图片文件名或固定说明）。
- 个性化与配置：
  - 将文案与图片改为单独的 `config.json`，页面自动读取配置，免修改代码。
  - 国际化支持：根据语言环境切换不同消息列表。
- 设计与视觉：
  - 夜间模式（深色背景与柔和阴影）。
  - 更丰富的背景（星空、渐层、轻粒子）。
  - 手提包激活范围可视化（接近时出现柔光圈，更直观）。


## 其他
- 图标来自 https://igoutu.cn/icons
- 示例图片博主 抖音 https://v.douyin.com/IUvAOuo6fSA/
- 网页作者 seegood https://explore.seegood.top/

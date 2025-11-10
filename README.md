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
- 示例：`--popup-duration: 12s;` 改为 `10s` 或 `15s`。

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

## 其他
- 图标来自 https://igoutu.cn/icons
- 示例图片博主 抖音 https://v.douyin.com/IUvAOuo6fSA/
- 网页作者 seegood https://explore.seegood.top/

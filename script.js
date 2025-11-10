// 消息列表（按你的内容逐条弹出）
const messages = [
  "我爱你 (｡♡‿♿｡)",
  "我想你了 (｡•́︿•̀｡)",
  "超想你呀 (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
  "好想见你 (´｡• ᵕ •｡`) ♡",
  "心里有你 (⁄ ⁄•⁄ω⁄•⁄ ⁄)",
  "一直惦记你 (´,,•ω•,,)♡",
  "记得吃饭 (๑•̀ㅂ•́)و✧",
  "要早睡 (｡･ω･｡)ﾉ♡",
  "不要熬夜 (╯>д<)╯⁽˙³˙⁾",
  "记得吃早餐 (☀️´ω`☀️)",
  "晚安 (｡･ω･｡)ﾉ♡~ Good Night",
  "不要感冒了 (。-人-。)",
  "多喝水呀 (♡°▽°♡)",
  "别饿肚子 (。•́︿•̀。)",
  "多吃点肉 (๑´ڡ`๑)",
  "累了就歇 (´-ωก`)",
  "好好休息 (＿ ＿*) Z z z",
  "出门带伞 (＾▽＾)／☂️",
  "路上小心 (•̀ᴗ•́)و ̑̑",
  "穿暖点哦 (◍•ᴗ•◍)❤",
  "记得添衣 (＾• ω •＾) 保暖！",
  "别太累啦 (摸摸头)",
  "少玩手机 (╯▽╰ )…",
  "今天开心呀 (★ ω ★)",
  "一切顺利 ٩(◕‿◕｡)۶",
  "照顾好自己 (づ｡◕‿‿◕｡)づ",
  "平安顺遂 (￣ω￣)",
  "事事顺心 (ノ◕ヮ◕)ノ*:･ﾟ✧ 幸运加持！",
  "明天见 ٩(◕‿◕)۶",
];

// 随机图片列表（从 images/01.png 到 images/13.png）
const imagePaths = Array.from({ length: 13 }, (_, i) => `images/${String(i + 1).padStart(2, '0')}.png`);

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const root = document.getElementById("popups-root");
const handbag = document.getElementById("handbag");
let bagIsVisible = false; // 手提包是否已显示（3s 后变为 true）

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function rectsOverlap(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function createPopup(text, options = {}) {
  const { center = false } = options; // 是否居中显示：传入 { center: true } 即可
  const popup = document.createElement("div");
  popup.className = "popup";
  // 构造图文内容（图片在前，文字在后）
  const content = document.createElement("div");
  content.className = "popup-content";
  const img = new Image();
  img.className = "thumb";
  img.src = pickRandom(imagePaths);
  const span = document.createElement("span");
  span.textContent = text;
  content.appendChild(img);
  content.appendChild(span);
  popup.appendChild(content);

  // 设定宽度以便更好计算位置
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const margin = 12;
  const width = clamp(Math.round(vw * 0.24), 200, 320);
  popup.style.width = width + "px";

  // 位置计算
  const maxLeft = clamp(vw - width - margin, margin, vw - width - margin);
  const maxTop = clamp(vh - 140, margin, vh - 140);
  let left, top;
  if (center) {
    // 首条弹窗居中：如需关闭居中，传 { center: false }
    left = Math.round((vw - width) / 2);
    top = Math.round((vh - 150) / 2);
  } else {
    // 随机位置（避免贴边）：如需更靠近边缘，可减小 margin
    left = Math.round(Math.random() * maxLeft);
    top = Math.round(Math.random() * maxTop);
  }
  popup.style.left = left + "px";
  popup.style.top = top + "px";

  // 自动移除：动画结束后清理
  popup.addEventListener("animationend", () => {
    popup.remove();
  }, { once: true });

  root.appendChild(popup);
  enableDrag(popup); // 使弹窗可拖拽到任意位置
}

// 连续弹出：依次播放每条消息，带随机间隔
function startPopups() {
  let idx = 0;

  // 首条消息居中显示：如需改为随机，删除或修改此行
  createPopup(messages[idx % messages.length], { center: true });
  idx++;

  const loop = () => {
    createPopup(messages[idx % messages.length]);
    idx++;
    // 弹出频率设置：减小数值会更快；增大会更慢
    // 为了近满屏效果，建议区间更短（更密集）
    const delayMin = 60;    // 最小间隔（毫秒），如需更快可改 40 或 50
    const delayRange = 180; // 随机范围（毫秒），越小越稳定、越密集
    const delay = delayMin + Math.random() * delayRange; // 实际间隔 = 最小 + 随机
    setTimeout(loop, delay);
  };

  // 可选：给首条居中一点间隔后再开始快速弹出
  setTimeout(loop, 300);
}

// 拖拽功能：按住弹窗任意处可拖动到屏幕内任意位置
function enableDrag(popup) {
  const margin = 6; // 拖动边界保留的安全距离：按需调整
  let startX = 0, startY = 0;
  let startLeft = 0, startTop = 0;
  let overBag = false;

  function onPointerDown(e) {
    // 仅响应主键或触控，避免右键误触
    if (e.button && e.button !== 0) return;
    e.preventDefault();
    popup.classList.add('dragging');
    popup.style.willChange = 'left, top';

    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseInt(popup.style.left || '0', 10);
    startTop = parseInt(popup.style.top || '0', 10);

    try { popup.setPointerCapture(e.pointerId); } catch {}

    function onPointerMove(ev) {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const width = popup.offsetWidth;
      const height = popup.offsetHeight;
      let newLeft = startLeft + dx;
      let newTop = startTop + dy;
      newLeft = clamp(newLeft, margin, vw - width - margin);
      newTop = clamp(newTop, margin, vh - height - margin);
      popup.style.left = newLeft + 'px';
      popup.style.top = newTop + 'px';

      // 检测是否与手提包碰撞（用于放大手提包与后续“收纳”）
      const pr = popup.getBoundingClientRect();
      const br = handbag.getBoundingClientRect();
      overBag = bagIsVisible && rectsOverlap(pr, br);
      handbag.classList.toggle('bag-active', bagIsVisible && overBag);
      popup.classList.toggle('over-bag', bagIsVisible && overBag);
    }

    function onPointerUp(ev) {
      try { popup.releasePointerCapture(e.pointerId); } catch {}
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      if (overBag) {
        // 松手时在手提包上：执行“收纳”动画并移除
        absorbIntoBag(popup);
      } else {
        // 恢复原动画（继续原剩余时间），按原时间消失
        popup.classList.remove('dragging');
        popup.classList.remove('over-bag');
        popup.style.willChange = 'transform, opacity';
        handbag.classList.remove('bag-active');
      }
    }

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  popup.addEventListener('pointerdown', onPointerDown);
}

// 触发手提包的抖动/闪光庆祝效果
function triggerBagCelebrate() {
  if (!bagIsVisible) return;
  handbag.classList.add('celebrate');
  setTimeout(() => handbag.classList.remove('celebrate'), 460);
}

// 吸入手提包：弹窗向手提包中心缩小并淡出（带轻微曲线飞行），然后移除
function absorbIntoBag(popup, opts = {}) {
  const { duration = 0.45, scale = 0.25, curve = true, celebrate = true } = opts;
  const pr = popup.getBoundingClientRect();
  const br = handbag.getBoundingClientRect();

  const startX = pr.left + pr.width / 2;
  const startY = pr.top + pr.height / 2;
  const endX = br.left + br.width / 2;
  const endY = br.top + br.height / 2;

  const startLeft = parseFloat(popup.style.left) || pr.left;
  const startTop  = parseFloat(popup.style.top)  || pr.top;

  // 轻微曲线的控制点（在中点附近，上方偏移，并带少许左右随机）
  const ctrlX = (startX + endX) / 2 + (Math.random() * 120 - 60);
  const ctrlY = (startY + endY) / 2 - 120;

  popup.classList.add('absorbed');
  popup.classList.remove('over-bag');
  handbag.classList.add('bag-active');
  popup.style.willChange = 'left, top, transform, opacity';
  popup.style.transition = 'none';

  const total = duration * 1000;
  const startTime = performance.now();
  const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function step(now) {
    const elapsed = now - startTime;
    const rawt = Math.min(elapsed / total, 1);
    const t = curve ? easeInOutCubic(rawt) : rawt;

    // 二次贝塞尔曲线位置（使用原始 rawt 作为参数保证路径均匀）
    const u = rawt;
    const x = (1 - u) * (1 - u) * startX + 2 * (1 - u) * u * ctrlX + u * u * endX;
    const y = (1 - u) * (1 - u) * startY + 2 * (1 - u) * u * ctrlY + u * u * endY;

    const left = Math.round(x - pr.width / 2);
    const top  = Math.round(y - pr.height / 2);
    popup.style.left = left + 'px';
    popup.style.top  = top  + 'px';

    const s = 1 + (scale - 1) * t; // 从 1 线性缩小到目标比例
    popup.style.transform = `scale(${s})`;
    popup.style.opacity = String(1 - t);

    if (rawt < 1) {
      requestAnimationFrame(step);
    } else {
      popup.remove();
      handbag.classList.remove('bag-active');
      if (celebrate) triggerBagCelebrate();
    }
  }
  requestAnimationFrame(step);
}

window.addEventListener("load", startPopups);
// 页面加载完成 3s 后再显示手提包（缩放 + 淡入）
window.addEventListener('load', () => {
  setTimeout(() => {
    handbag.classList.add('bag-visible');
    bagIsVisible = true;
  }, 3000);
});

// 点击手提包：让当前所有弹窗迅速飞向手提包并在手提包位置缩小消失
handbag.addEventListener('click', () => {
  if (!bagIsVisible) return;
  const all = Array.from(document.querySelectorAll('.popup'));
  for (const p of all) {
    if (p.classList.contains('dragging')) continue; // 正在拖拽的弹窗不处理
    absorbIntoBag(p, { duration: 0.32, scale: 0.12, curve: true, celebrate: true });
  }
});
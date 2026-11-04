# Figma 素材交接单 · Design Handoff Brief

> 目标：把 Figma 文件 `HY68tE3hHSzkXjXpdeZlXw`（node **238-2**，Dev Mode）里的素材库，
> 对齐到 CloudSail × Fideight 站点当前 v2 设计语言。

## 为什么当前会话读不到这个文件（排查结论 2026-11-05）

| 检查项 | 结果 |
|---|---|
| 新链接（node 238-2 / `m=dev` / `t=` 分享令牌） | 已逐一尝试 |
| Figma OAuth 网关 `figma.agent-gateway...` | **404**（对照：github 网关 200，说明 GitHub 已授权、Figma 未授权） |
| 会话内 MCP 清单 | github / kling / sheetagent / fazhi-law / space-library —— **无 figma** |
| Figma Dev Mode MCP 本地端口 `127.0.0.1:3845` | 无监听 |
| 匿名打开设计页 | **403 / 需登录** |
| embed 壳元数据 | **`is_public: false` + `requires_cookies: true`** ← 文件是私有的，必须登录态 |
| 无头 Chromium 渲染 embed | CloudFront 403 |

**结论**：不是链接或节点参数的问题。文件私有，而我运行在独立云沙箱，
拿不到你本地 Figma 的登录 cookie，也访问不到你电脑上的 Dev Mode MCP 端口。
GitHub MCP 之所以能协同，是因为它走云端代理；Figma 那个是**本地 MCP**，两端不互通。

---

## 给「本地 CodeBuddy」的提示词（复制过去执行）

> 你本地的 CodeBuddy 已经连上了 Figma Dev Mode MCP。把下面这段发给你本地的 CodeBuddy，
> 让它把设计数据导成文本，然后把输出粘回给我，我就能精准对齐站点。

```
请读取 Figma 文件 HY68tE3hHSzkXjXpdeZlXw 的 node 238-2（Dev Mode 画板），
输出一份纯文本设计交接单，包含：

1. Design Tokens
   - 所有颜色（名称 + hex + 用途：背景/文字/主色/强调色/边框）
   - 字体 family、字重、字号阶梯（H1/H2/H3/正文/小字）、行高
   - 间距阶梯、圆角值、边框宽度、阴影
2. 画板截图：导出 node 238-2 为 PNG（1440 宽）
3. 组件清单：导航、Hero、卡片、按钮、表单、页脚 —— 每个的尺寸/内边距/对齐/状态
4. 所有可见文案（中文 + 英文），按从上到下顺序
5. 布局：栅格列数、最大内容宽度、区块顺序、留白节奏

只输出结构化文本，不要改任何文件。
```

---

## 当前站点 v2 Design Tokens（对齐基准）

来源：`style.css`，参照 yiwuha.com 的克制风格。

| 项目 | 值 |
|---|---|
| 主色（标题/导航底） | `#1e2228` 墨黑 |
| 最深底（Hero/页脚） | `#0d1116` |
| 强调红 | `#d7262c`（hover `#ff4b51`） |
| 点缀金 | `#c9a254` |
| 纸张/卡片底 | `#f2f0ec` 米白 / `#fff` 卡片 |
| 边框线 | `#e3e0da` |
| 次要文字 | `#6b6f76` / 浅灰 `#c9cbcf` |
| 展示字体 | **Anton**（大写、压缩、方形） |
| 正文字体 | **Montserrat**（中文回落 PingFang SC / 微软雅黑） |
| 形状 | 直角（0 圆角）、扁平卡片、1px 边框、hover 亮金边 |
| Hero | 左对齐 Anton 超大标题 + 72×5px 红色短下划线 |
| 大数字 | 白底 + Anton 红色数字（yiwuha 的 80K / 2.1M 同款） |

---

## 素材到位后我会做的对齐

1. 用 Figma 的 hex 替换 v2 调色板（保留变量名，一次换皮）
2. 把 Figma 的字号/间距阶梯写进 `:root`，统一全站
3. 按组件清单重做导航、Hero、卡片、按钮、页脚
4. 全站 20+ 页面回归检查（含中英切换、俄区佣金页、驾驶舱）
5. 推送 GitHub → Pages 与线上应用同步更新

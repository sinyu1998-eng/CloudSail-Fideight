# AIsa（aisa.one）反向工程报告
# Reverse-Engineering AIsa: The Resource Layer for AI Agents

> 版本 v1 · 2026-10-30 · 中英双语
> 方法：官网全页抓取（首页/connect/pricing/sitemap）+ 融资新闻交叉验证
> 用途：竞合判断 + 可抄打法 + 对 CloudSail/Fideight 的战略含义

---

## 一、一句话拆解 One-liner

**AIsa = 给 AI Agent 用的"资源超市 + 收银台 + 审计员"三合一**：一个 MCP server 接入 5,000+ API / 110+ 模型 / 40+ Skills，覆盖 GTM、SEO、GEO、电商、社媒五大数据域；每个返回值都带来源、方法和时间戳；按结果计费（$0.001 起），支持稳定币与 x402 协议的机器对机器微支付。

*AIsa = a resource supermarket + checkout + auditor for AI agents: one MCP server behind 5,000+ APIs across five data domains; every value carries source/method/timestamp; pay-per-result from $0.001, settling in stablecoins and x402.*

---

## 二、公司与融资 Company & funding

| 项 | 内容 |
|---|---|
| 公司 | AIsa，总部旧金山，2025 年成立 |
| 创始人 | **Jordan Liu**（solo founder & CEO）——连续创业者：东南亚面向无银行人群的数字钱包 → 区块链钱包 → AIsa。**人设与项目完美同构：给新经济体修支付铁路** |
| 融资 | 2026-07 种子轮 $6.5M（**Alibaba** + Tribe Capital 领投，住友商事、Draper、Saison 跟投）；2026-10 种子扩展轮（**Tether** + HIVEN 战略入股），累计 **>$9M** |
| 增长 | 2026 年 2–6 月注册 agent 用户 150×、API 调用与交易量 200×；20,000+ 注册 agent，零投放 |
| 客户 | Impossible Finance（唯一具名付费客户）+ 8 个 logo 墙（Enrich Labs、Ottermind、iMerch、Felo 等） |

*Founded 2025 in SF by solo founder Jordan Liu (ex-digital wallet for the unbanked → crypto wallet). $6.5M seed (July 2026, co-led by Alibaba & Tribe) + extension led strategically by Tether (Oct 2026), >$9M total. 150× agent growth Feb–Jun 2026 with zero marketing.*

---

## 三、产品架构 Product architecture

```
┌────────────────────────────────────────────────┐
│  接入层：一个 MCP server / Skills / OAuth 登录    │
│  支持 ChatGPT、Claude、Cursor、Grok、Manus、     │
│  OpenClaw 等 30+ 客户端，插件目录一键添加         │
├────────────────────────────────────────────────┤
│  数据层（五域，统一 schema）：                    │
│  · GTM：公司/决策人/融资/tech stack（邮件过验才返）│
│  · SEO：关键词量/难度/CPC（Google/Baidu/Naver…）  │
│  · GEO：同一问题打 5 个 AI 答案引擎，看品牌被谁提 │
│  · Commerce：Amazon/TikTok Shop/Temu/1688 等 11 站│
│  · Social：读帖+发帖（9 平台），幂等防重发        │
├────────────────────────────────────────────────┤
│  治理层：来源/方法/时间戳随每个值返回；           │
│  reported / observed / estimated 三种值分开标注   │
├────────────────────────────────────────────────┤
│  结算层：按结果计费 + 企业预算/限额/审批/审计      │
│  法币或稳定币；x402 协议免开户按次付费            │
└────────────────────────────────────────────────┘
```

**核心差异化不是协议，是「企业采购语境」**：权限、预算、审批流、审计轨迹与资源访问长在同一层。买的不是开放钱包，是**带护栏的通道**。
*The moat isn't a protocol — it's enterprise procurement semantics: permissions, budgets, approval flows and audit trails grow on the same layer as resource access.*

---

## 四、商业模式与定价 Business model & pricing

| 档 | 价格 | 要点 |
|---|---|---|
| Starter | **免费**（每月 $1 额度，不用卡） | 无摩擦获客钩子 |
| Developer | **按结果 $0.001 起**，$10 起充值 | 卡充值+自动续费；空响应/预检失败不收费 |
| Enterprise | 合同制 | 统一发票、无限席位、定制字段、**自带 vendor key**、工程师陪跑 |

**分产品线中位单价**：Social $0.001 / Ads $0.002 / Catalog $0.005 / Commerce $0.012 每次调用；另有 **AI employee 月订阅**（飞书/企微/Slack 里接任务，盯竞品、1688 找供应商，不可逆操作先请示）。

*Starter free ($1/mo balance, no card) → Developer pay-per-result from $0.001 → Enterprise contract (BYO vendor keys, engineers through launch). Plus an AI-employee subscription taking tasks in Feishu/WeCom/Slack.*

**值得注意的定价心理学**：
1. "无结果不收费"——把数据质量风险从客户转移到自己（这就是信任定价）
2. 每张卡标注"中位数单价"，把定价透明当作卖点
3. 免费层每月过期 → 制造回访习惯

---

## 五、技术栈线索 Tech-stack fingerprints

| 线索 | 推断 |
|---|---|
| 图片 URL 带 `?dpl=dpl_3CTSX…` | **Vercel 部署 ID → Next.js + Vercel** |
| console.aisa.one / docs 子域 | 前后端分离，docs 独立 |
| MCP server + Skills（GitHub: AIsa-team/agent-skills） | 双形态分发：server（在线）+ skills（文件式，给 Claude Code 类客户端） |
| OAuth sign-in，免贴 key | 已进入 ChatGPT 官方插件目录（平台级分发） |
| **x402 协议** | Coinbase 推的 HTTP 402 机器支付——agent 免开户、按次付费，这是它和 Tether 联手的接口 |
| 站点 7 语言（zh/es/it/pt-br/tr/ja） | 全球化获客，中文是第一优先外语 |
| sitemap 结构 | products / solutions / pricing / catalog / academy / affiliate / labs / enterprise / why-aisa / brand——**官网即增长机器** |

---

## 六、GTM 打法（可抄清单）GTM playbook worth copying

1. **Solutions 页按团队切**：跨境卖家 / 营销机构 / 创作者 / agent builder 各一页，任务和产品组合直接预选——不是"我们的技术多牛"，是"你的团队今天能干什么"
2. **插件目录分发**：进 ChatGPT 官方 plugin directory + OAuth 免 key，把"接入成本"压到一次点击
3. **信任即卖点**：来源/方法/时间戳随每个值返回、"reported/observed/estimated 分开"、校准报告公开——**数据可信度本身被产品化了**
4. **academy + affiliate + brand 资源页**：教学获客、分销裂变、品牌资产三者齐备
5. **免费层设计成"每月过期"**：不是永久免费，是每月回访

---

## 七、对 CloudSail / Fideight 的战略含义 Strategic implications

### 7.1 三重身份：验证者 · 供应商 · 竞争者

| 身份 | 证据 | 动作 |
|---|---|---|
| **论点验证者** | Tether 战略入股"agent 结算层"、稳定币做机器微支付、企业要审计轨迹——**这正是 Fideight BP 的核心叙事** | 融资叙事里直接引用："Tether 刚刚用真金白银验证了 agent 经济需要可信结算层；我们把同一逻辑推进到物理贸易" |
| **潜在供应商** | 它的 Commerce 域（Amazon/TikTok Shop/Temu/1688，$0.012/次）正是我们黑五雷达、询盘 Agent 需要的数据源 | 花 $10 充值实测：AIsa 数据 vs 我们现用数据源的口径对比，若质量好可直接接进询盘 Agent 的 MCP |
| **局部竞争者** | **AI employee for cross-border sellers**（盯竞品、1688 找供应商、飞书/企微接任务）与我们的 SOHO App/询盘履约 Agent 正面重叠 | 加速差异化：**它做的是"信息代理"，我们做的是"信任代理"**——它告诉你供应商是谁，我们保证货是真的、钱是安全的 |

### 7.2 最重要的一句话定位

> **AIsa 解决的是"agent 如何可信地获取信息和花钱"；Fideight 解决的是"agent 如何可信地交付实物和收钱"。它是数字资源层，我们是物理履约层。它网络的尽头，正好是我们协议的起点。**

*AIsa is the trusted layer for agents to acquire information and spend; Fideight is the trusted layer for agents to deliver physical goods and get paid. Their network's endpoint is our protocol's entry point.*

### 7.3 机会窗口：成为 AIsa 上的"行业服务 provider"

AIsa 的资源目录里有"外部数据、AI 搜索、模型、API、软件工具、**行业服务**"——**"行业服务"这一格今天基本是空的**。物理验货、现场取证、里程碑托管，恰恰是纯 API 网络做不了的"物理世界资源"。把 CloudSail 的验货存证做成 AIsa catalog 里的一个 endpoint（`inspect_factory(domain, sku)` → 返回带 EAS 哈希的验货报告），就等于**站在它的 250k+ agent 用户面前开店**。

*Their catalog lists "industry services" as a resource class — mostly empty today. Ship `inspect_factory()` as an endpoint returning EAS-attested reports, and CloudSail opens a storefront in front of their 250k+ agents.*

### 7.4 融资参照

AIsa：solo founder、$9M、Alibaba+Tether 背书、产品 2025 上线。**同类叙事下我们不需要更多验证，需要的是把"物理证据网络"的稀缺性讲出来**——它融的是"数字资源层"，没人占住"物理资源层"，这就是我们的位置。

---

## 八、行动清单 Actions

- [ ] **本周**：注册 AIsa 免费层（$1 额度），实测 Commerce 数据（Amazon/TikTok Shop listing）与现用源对比，产出一张口径对比表
- [ ] **本周**：用 x402 文档确认其免开户支付流程——评估 MilestoneEscrow 是否兼容/呼应该协议叙事
- [ ] **两周内**：BP 融资叙事加一页 "Agent Economy Rails"——引 Tether×AIsa 案例，定位 Fideight 为物理履约层
- [ ] **一个月内**：设计 `inspect_factory()` API 原型（入参 domain/sku，出参 EAS attestation + 报告哈希），作为入驻 AIsa catalog 的谈判物
- [ ] **可选**：联系 Jordan Liu（solo founder 对 solo founder）——不是求合作，是"你的网络缺物理证据层，我补这一格"

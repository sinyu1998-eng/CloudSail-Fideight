# 市场调查 · 软件 / 硬件 / 代运营三类公司（CloudSail × Fideight 定位参考）

> **目的**：摸清你所在赛道的三类玩家——做软件的、做硬件的、做出海代运营的——看清谁是对手、谁是伙伴、谁是可被我们"补上那一格"的空白。数据均来自 2026 年公开资料。
> *Purpose: map the three player types around CloudSail×Fideight — software, hardware, cross-border agency — to separate competitors from partners and spot the gap we fill.*

> **核心结论（先讲）**：软件巨头（QIMA/SGS）在做"验货数字化"但**不碰链**；区块链信任层（OriginTrail/EAS）在做"来源可信"但**不碰现场采集**；硬件厂（Meta/Rokid）在做"消费级玩具"但**不做 B2B 作证**；代运营（飞书/钛动）在服务我们的客户但**不提供信任基础设施**。四类都没有把"现场采集 → 链上作证 → 条件支付"封成一个开放协议——这就是我们的蓝海。
> *Nobody binds field capture → onchain attestation → conditional payment into one open protocol. That gap is us.*

---

## 一、软件公司（Software）
### 1.1 验货/质检 SaaS（我们的直接相邻赛道）
| 公司 | 定位 | 关键能力 | 价格/模式 | 与我们的差异 |
|---|---|---|---|---|
| **QIMA / QIMAone**（香港，2005） | 全球检验数字化平台 | 检验员 App（清单/照片/GPS/离线/多语/签名/条码）、API 接 PO、4 周 onboarding、风险雷达 | 年订阅，按后台用户+检验员+工厂数计费，报价制 | 它**数字化但不上链**；我们是"数字化+链上作证+托管放款" |
| **SGS Digicomply** | 合规+检验调度 | 国际标准数据库、合规检查 | 报价制 | 同：重合规，不碰链上结算 |
| **Inspectorio / HQTS** | 检验+供应链质量看板 | 质量数据分析、供应商风险 | 月订阅 $50–$2,000 | 同一代际，缺"可核验证据+自动放款" |
| **Alibaba Quality Plus / FactoryEye** | 视频验货+AI 缺陷识别 | 工厂直播视频流 + AI 检测 | $200–$800/月 | 它长在阿里生态内，我们是开放协议、跨平台 |

**趋势（2026）**：数字 QC 平台让进口商缺陷率平均降 31%（120 家样本）；但行业共识是"技术替代不了人在现场的谈判与担责"——这正是我们"人只在三处出现（到场/担责/裁决）"的 AI-Native 逻辑。
> *Trend: digital QC cuts defect rates ~31%, but humans still own negotiation & accountability on the ground — exactly our "AI does the rest" thesis.*

### 1.2 区块链信任/溯源层（我们的技术同类）
- **OriginTrail、TradeTrust、GS1/EPCIS、Baseline Protocol、Contour、Marco Polo**：做"来源/单据可信"，但都是**后台数据可信**，没有眼镜/手机在现场采集，也没有"证据→放款"闭环。
- **EAS（Ethereum Attestation Service）生态、Kleros（仲裁）**：我们**直接接入**的底层，不是对手——约 $0.001/次（Base），可 easscan 核验。

### 1.3 AI Agent / 出海工具（我们的产品形态同类）
- **我们自己的"询盘履约 Agent"**：对话捕捉 → 商机备忘 → 信任策略 → 三档报价 → 客户母语交付。
- **AIsa（aisa.one）**：给 Agent 用的"资源层+MCP+稳定币结算"（前次已反向工程）——是**潜在供应商/局部竞争者**；它的 catalog 里"行业服务（验货）"是空的，我们可以把 `inspect_factory()` 入驻。

**软件侧一句话定位**：我们不重造验货 SaaS，也不重造溯源链——我们做"把两者用协议缝合，并让证据直接决定钱"的那一层（L0→L3 闭环）。

---

## 二、硬件公司（Hardware · AI 智能眼镜）
### 2.1 市场规模与格局（2026 公开数据）
- **整体**：2026 Q1 全球智能眼镜出货 **同比 +83%**；其中 AR +136%、无显示 +210%（Counterpoint）。
- **份额**：Meta 无显示细分 **81.3%**（Ray-Ban Meta）；波导 AR 市场 **Rokid 41%（全球第一）**、Meta 38%、Even Realities 9%、阿里 5%（Counterpoint）。
- **消费级 AR 前五**：Meta ~20%、XREAL、Even Realities、Rokid、RayNeo（雷鸟），合计 53.2%（TrendForce，2026 全球 AR 出货 131 万台、+111%）。
- **众筹已被验证**：Halliday $330 万+、已交付 1.5 万台；Looktech 4,774 支持者/$119 万；我们朋友 **Monako** 48g Linux 开发者眼镜（$19 预订）。

### 2.2 BOM 成本结构（决定我们 ODM 毛利）
- 一副带显示的 AI 眼镜：**光学显示占 40–50%，主控芯片占 20–30%**（产业链共识）。
- Ray-Ban Meta 的 **高通 AR1 Gen1 约 $55，占整机 34%**。
- 技术路线收敛到 **Micro LED + 光波导**（我们规格书已据此定 ≥1200 nits / 单色绿基线）。

### 2.3 我们的硬件定位
| 维度 | 消费级（Meta/Rokid/Monako） | 我们（CloudSail 验货官） |
|---|---|---|
| 用户 | C 端消费者 | B 端跨境卖家/验货方/工厂 |
| 卖点 | 拍摄/翻译/助手/娱乐 | **一键作证 + 微距读码 + 带位置证据** |
| 变现 | 硬件一次性 | 硬件 + 存证订阅 + 协议分成 |
| 供应链 | 自有/代工 | **华强北 ODM**（规格书已出） |

**硬件侧一句话定位**：不跟消费级卷参数，卷"验货作证"刚需——抓拍键、微距、GPS 是消费眼镜没有的；供应链走华强北 ODM，BOM 控在 $160 以内守住 $399 档 35% 毛利。
> *We don't fight consumer specs; we win on inspection-attestation must-haves (capture button, macro, GPS) that consumer glasses lack; Huaqiangbei ODM keeps BOM ≤$160.*

---

## 三、代运营公司（Cross-border Agencies · 出海营销/运营）
> 这类公司**不是对手，是渠道与合伙人**——它们服务的跨境卖家正是我们的 ICP（理想客户）。

### 3.1 头部玩家（2026 公开榜单）
| 公司 | 定位 | 适合客户 | 与我们的关系 |
|---|---|---|---|
| **飞书深诺 Meetsocial** | AI 全球营销 AgentOS（Marvy，5 大 Agent 全漏斗） | 中大型品牌、预算充足 | 渠道：可把"验货存证+托管"当白标增项卖它的客户 |
| **钛动科技 Tec-Do** | 数据驱动、全链路、本土化团队 | 年广告 >$50 万头部卖家 | 渠道/伙伴 |
| **易点天下 Yeahmobi** | 技术驱动、移动/程序化投放 | 应用/游戏出海 | 渠道 |
| **木瓜移动 Papaya** | 老牌、基础投放性价比 | 中小卖家/初创 | 渠道 |
| **蓝色光标 BlueFocus** | 整合营销巨头、媒介基座 | 大型品牌 | 潜在大客户/伙伴 |
| **科灯跨境** | 建站+社媒+SEO+Ads 一体化闭环 | 制造/外贸/B2B | **高度互补**：它的"建站引流"我们补"信任转化" |
| **落日雁 / 卧兔网络** | TikTok 代运营、达人资源 | 快节奏电商 | 渠道 |
| **麦斯国际 Max World** | TikTok TSP/TAP/CAP、AI 短视频 | TikTok 出海 | 内容/达人渠道 |

### 3.2 我们与代运营的三种关系
1. **渠道（主）**：代运营手里有成批跨境卖家，我们作为"信任层白标增项"嵌入它们的服务包——它们增收、我们获客。
2. **互补（科灯类）**：它们做"公域引流→站点转化"，我们做"转化后的信任背书→托管成交"，拼成完整闭环。
3. **不做什么**：**不要自己变成代运营**。该赛道已 commodity（价格透明、人力密集、毛利被压）；我们卖的是协议层的可信履约，毛利 60–90%，远高于代运营的 10–20% 服务费。

> **别踩的坑**：代运营是"卖人力时间"，我们是"卖可复用的信任协议"。前者线性、难复利；后者指数、可复利（见 FDE 前向部署引擎文档）。
> *Don't become an agency: it's linear, low-margin human time. We sell a reusable trust protocol — exponential, compounding.*

---

## 四、对我们的行动含义（收口）
| 玩家类型 | 我们的动作 |
|---|---|
| 软件（QIMA/SGS/EAS） | 接入 EAS/Kleros 做底层；不重造 SaaS；讲"数字化≠可信结算" |
| 硬件（Meta/Rokid/Monako） | 华强北 ODM 自研；讲"消费玩具 vs 会作证的眼镜"；众筹 PH 验证 |
| 代运营（飞书/钛动/科灯） | 发展成分销渠道/白标伙伴；绝不自营代运营 |
| 空白（capture→attest→settle 开放协议） | **我们独占**——这是所有材料的统一叙事 |

---

## English Executive Summary
- **Software**: QIMA/SGS digitize inspection but never touch chain; OriginTrail/EAS do provenance but not field capture; we own the "capture→attest→settle" protocol layer. EAS/Kleros are infra we integrate, not competitors.
- **Hardware**: 2026 smart-glasses market +83% YoY (Counterpoint); Rokid leads waveguide AR at 41%; Meta dominates no-display at 81%. BOM is 40–50% optics + 20–30% chip. We compete on B2B inspection-attestation (capture button, macro OCR, GPS evidence), not consumer specs; Huaqiangbei ODM keeps BOM ≤$160 to hold ~35% GM at $399.
- **Agencies**: Meetsocial / Tec-Do / Yeahmobi / Papaya / BlueFocus / 科灯 are channels to our ICP, not rivals. Partner as white-label trust layer; never become a low-margin agency ourselves.
- **The gap we own**: nobody binds field capture → onchain attestation → conditional payment into one open protocol.

# Fideight × CloudSail · 商业计划书 v2.0
## 真实世界交易的信用协议 + 现场证据采集网络
**版本 v2.0 ｜ 2026-10 ｜ Builder: Qianru (Carol Qianru Huang) ｜ ETH Shenzhen**

---

## 1. 执行摘要

**Fideight**（fides 信用 + freight 货运）是**真实世界交易的信用协议**：把验资、验货、生产、交付全链路变成链上可验证的里程碑，货款由智能合约托管、凭证据自动放款、违约方失去保证金。

**CloudSail 云帆现场助手**是它的现场入口：业务员戴眼镜说一句话，对话自动变成结构化证据——客户档案、验货记录、质检结论——哈希上链盖章。

**双引擎定位**：
> Datamora 发现链上信号。Fideight 让线下每一票货都可验证。
> CloudSail 采集信号，Fideight 为信号定价与担保。

商业模式三件套：**Protocol**（证明+托管，收协议费）· **Marketplace**（验货方市场，抽成）· **核算工具**（链上分录 SaaS）。我们是一个 protocol、一个 marketplace、一台核算机器。

---

## 2. 问题：跨境高价值交易的全链条信任成本

| 环节 | 现状 | 损失 |
|---|---|---|
| 验资 | 银行截图、口头承诺，可伪造 | 骗货/骗定金 |
| 验货 | 依赖单方验货报告，买方无法核验 | 以次充好、调包 |
| 生产/交付 | 微信邮件传进度，无不可篡改记录 | 拖期扯皮、举证困难 |
| 支付 | T/T 预付全凭信任，尾款拖欠常见 | 现金流断裂 |
| 核算 | 各系统手工对账，审计成本高 | 月末对账灾难 |
| 合规 | 出口管制/制裁筛查靠人工 | 巨额罚单与刑事风险 |

**核心矛盾**：高价值货物（芯片、设备、大宗品）的信任成本高达交易额 3–8%，且信任不可传递。

---

## 2.5 FDE 前向部署引擎：用人才破解 AI 的冷启动

> 这一章回答一个投资人必问的问题：**你们的 Agent 从哪儿搞到真实场景和数据？**

**（1）模式 Model.** FDE = Forward Deployed Engineer（前向部署）。我们不先卖软件——义乌老板不买软件；我们也不做外包派工。我们把一支由年轻工程师 / 双语运营组成的**前向部署小队**塞进义乌老板的真实经营现场（询盘跟进、验货协调、账本、跨境收款、合规筛查），用服务收费覆盖人力，同时强制沉淀 AI 能力。

**（2）三边聚合 Three-sided aggregation.**
| 边 | 是谁 | 为什么要来 |
|---|---|---|
| 供给侧 | 在校/应届工程师、双语运营 | 他们要的不是工资，是**真实商业履历**；我们给真场景 + 链上可验证的履历存证 |
| 需求侧 | 义乌 3,700+ 商户网络、工厂、已有 90 家店铺 | 他们有货有钱有痛点，缺的不是软件，是**有人帮我把事办成** |
| 学习侧 | CloudSail × Fideight | 每一次部署产出数据、模板与上链存证，回流训练 Agent |

**（3）AI-Native 的核心：人是脚手架，不是产能。**
传统服务公司是线性经济（`收入 = 人数 × 人效`）；我们是指数经济（`第 N 个客户的人力成本 ≈ 第 N−1 个的 20%`），因为前一个客户身上踩过的坑已经变成下一个客户的 Agent 模板。每一期结项必须交付三件套：①可复用 Agent 工作流模板 ②一组结构化场景数据 ③一条 EAS 上链存证。**同一场景第三次出现必须转为 Agent 能力。**

**（4）为什么锁定义乌.** 一个市场 3,700+ 商户、无需出差即可高密度拜访；单笔金额适中、场景密集，是训练 Agent 最便宜的**数据油田**。创始人自 2019 年以义乌两个电商村为田野完成本科论文，2023 年起历任义乌 Toastmasters 会长 / 区域总监，与本地工厂主、商户持续深度接触——**关系基础真实存在，不是 BD 计划**。路径：义乌单带跑通 → 永康/珠三角复制 → 中东 JV。

**（5）单位经济 Unit economics.**
| 阶段 | 人力投入 | 毛利率 |
|---|---|---|
| 第 1 家 | 100%（纯人工，允许亏钱买数据与模板） | ~30% |
| 第 10 家 | 40% | ~60% |
| 第 50 家 | 20%（人只剩"到场、签字、关系"） | ~80% |
| 第 100 家 | <10%（变身为 SaaS + 协议费） | ~90% |

**（6）三条规定（防止沦为外包公司）.**
1. 不接受**不可复用的私有化定制**；
2. 结项三件套缺一不予结项；
3. 同一场景第 3 次出现，必须自动化。

**（7）为什么这构成护城河.** 老板在我们的系统里积累的履约记录、验货证据、账本**换服务商带不走**——直接解掉 FDE 模式"装完就走"的经典顽疾。**FDE × AI-Native = 三省复利：场景数据越来越厚、交付成本越来越低、客户越来越难走。**

---

## 3. 产品：双引擎

### 3.1 CloudSail（现场引擎，已落地 v1.0.12）
- 语音→CRM、15 国语种实时翻译、确定性三档报价、产能上报（详见附录 A）。
- 本计划书中的新角色：**Fideight 的现场证据采集器**——验货照片、谈判纪要、质检结论由眼镜/手机端直采，哈希自动上链。

### 3.2 Fideight（协议引擎，Sepolia Demo 已就绪）
- **证据层**：多模态证据 → Merkle 打包 → SHA256 → EAS Attestation；全文加密存 IPFS。
- **结算层**：MilestoneEscrow 合约，USDC 里程碑放款；ERC-4337 无 Gas 钱包，业务员扫码授权（EIP-712 限定金额/里程碑/有效期）。
- **市场层**：验货方/审计者质押接单，违规失格（slashing）、声誉累积，Kleros 式仲裁。
- **核算层**：链上双向分录自动生成，发票 Token 化可贴现。
- **隐私层**：端到端加密对话 + Nym mixnet 传输 + PIR 私密查账（见 §5）。

### 3.3 例子：俄客机买 2×B300 全流程（合规版）
买家 ZK 证明偿付能力→货款 USDC 入托管→合规 Oracle 出口管制筛查（**未通过即永久拒绝并留痕——合规拦截本身就是产品能力**）→ 卖方生产，进度上链 → 验货方接单验货，眼镜采集证据→EAS 盖章 → 清关物流 IoT 上链 → 每里程碑合约自动放款 → 任何一方可回溯全链证据，欺诈无法藏身。

---

## 4. 技术架构（摘要，全文见《技术架构与云帆联通》）

```
L5 核算：链上分录 · 发票Token化 · ERP API
L4 市场：质押接单 · 声誉 · 保证金扣减 · 仲裁
L3 结算：MilestoneEscrow · USDC · AA钱包 · 隐身地址 · 合规Oracle
L2 隐私：E2E加密 · Nym mixnet · PIR · ZK证明
L1 证据：多模态→Merkle→SHA256→EAS · IPFS加密存储
L0 采集：云帆眼镜/手机PWA（语音→结构化→证据）
```

**六个联通接口**（复用云帆现有 /api/extract、/api/insight，新增 /api/evidence 等半天内可完成）——业务员的销售动作即链上证据动作，这是独有的入口壁垒。

---

## 5. 加密对话（Confidential Communications）

| 场景 | 方案 |
|---|---|
| 谈判纪要/验货记录存储 | 端侧 libsodium sealed box 加密后上 IPFS，服务端只见密文，密钥在交易各方 |
| 验货请求/查账传输 | Nym mixnet 混淆元数据，防"谁在跟谁做大单"的商业侦察 |
| 账目核验 | PIR：读记录，服务端不知道读了哪条 |
| 资金证明 | ZK 偿付能力证明：证明"钱够"而不露余额 |
| 争议披露 | 各方用自己的密钥 selective disclosure，只解密指定证据给仲裁方 |

卖点：**商业隐私默认开启**——大额交易最怕暴露交易对手，我们让"可审计"与"可保密"同时成立。

## 6. 加密支付（Encrypted Settlement）

| 能力 | 实现 |
|---|---|
| 托管 | MilestoneEscrow：USDC 锁定，bps 比例分里程碑 |
| 无感体验 | ERC-4337 + Paymaster：业务员无需懂 Gas，眼镜扫码即授权 |
| 授权安全 | EIP-712 明文限定：金额上限、里程碑清单、有效期、单签双签 |
| 隐私支付 | Stealth address 收款：外部看不到买卖双方资金关系 |
| 合规支付 | 放款前强制合规 Oracle 筛查；Travel-Rule 合规 VASP 出入金 |
| 稳定币结算 | USDC 为主，多币种核算层自动折算 |

卖点：**钱不动，货不放；证据不到，钱不出。** 且全程加密、可审计、合规内建。

---

## 7. 市场与切入

- **首切**：跨境高价值设备/芯片/大宗贸易的中小贸易商与工厂（单价高、信任痛感最强、决策链短）。
- **钩子**：CloudSail 免费采集 → Fideight 托管收协议费（0.3–0.8%/交易）→ 验货市场抽成（10–15%）→ 核算 SaaS 订阅。
- **对标**：贸易融资科技（ Kontist/Tradeshift 类）无链上担保；链上托管协议无现场采集与合规拦截。Fideight = 证据 + 资金 + 合规三合一。
- **出海双引擎（2026 Q4 启动）**：① **Product Hunt 发布**——PH 上 AI 眼镜全是消费级，我们是唯一"B2B 验货 + 链上作证"，官网链接指向 `fideight-site/crowdfund.html` 沉淀线索；② **Kickstarter 众筹**（软目标 $50K/拉伸 $150K，四档 $199/$399/$999/$2,999）——硬件预购即 L0 采集层首批真实场景入口。详见《眼镜众筹与PH出海_GTM与商业计划》。

## 8. 商业模式

| 收入线 | 定价 | 毛利 |
|---|---|---|
| 协议费 | 0.3–0.8% / 托管交易额 | ~95% |
| 验货市场 | GMV 抽成 10–15% | ~70% |
| 核算 SaaS | ¥3000–8000/席/年 | ~85% |
| CloudSail 订阅+硬件包 | 见附录 A | 25–35% |
| 远期：发票贴现撮合 | 撮合费 | 规模化后 |

## 9. 壁垒
1. **现场入口**：眼镜抢占"货在面前的 10 分钟"，App 无法复制。
2. **证据网络效应**：每笔交易沉淀带签名的证据链，验货方声誉与历史不可移植。
3. **合规拦截即卖点**：被协议挡下的高风险交易是最强资方/监管信任状。
4. **确定性内核**：金额计算走公式引擎，AI 只做理解——企业敢用。
5. **FDE × AI-Native 复利（见 §2.5）**：前向部署小队把每一次人工交付强制沉淀为 Agent 能力，因此夺取场景数据的同时，交付成本随客户数递减、客户迁移成本随使用时长递增——经验曲线属于我们，不属于同行。

## 10. 路线图
| 阶段 | 时间 | 里程碑 |
|---|---|---|
| M0 Demo | 现在 | EAS+托管 Sepolia 闭环（已就绪） |
| M1 试点 | 0–6 月 | 3 笔真实托管交易走通全流程；CloudSail 3 家展会试点 |
| M2 主网 | 6–12 月 | 主网+USDC；验货市场内测 20 名验货方；合规 Oracle 上线 |
| M3 生态 | 12–24 月 | 发票 Token 化贴现；Nym/PIR 隐私层全量；开源 SDK |

## 11. 团队
- **Qianru（Carol Qianru Huang）— Creator**：产品与贸易场景，云帆出海/Fluxa 运营，一线外贸渠道。
- **招募**：Solidity 工程师 ×1、CloudSail AIUI 工程师 ×1、验货渠道合伙人 ×1。

## 12. 融资
- 融资规模、估值与资金用途不在公开仓库披露；投资人版 BP 请通过 [contact.html](../contact.html) 索取。

## 13. 风险与对策
| 风险 | 对策 |
|---|---|
| 监管（支付/证券属性） | 只做托管与结算，不发币；牌照路线走 VASP 合作 |
| 预言机作假 | 多源证据 + 保证金扣减 + 仲裁，单一验货方无法独立放款 |
| 隐私与合规冲突 | 默认加密 + selective disclosure，监管可审计轨迹 |
| 采用冷启动 | CloudSail 免费入口先跑量，Fideight 收费在后 |

---
### 附录 A：CloudSail 产品（v1.0.12）
语音记客户 / 15 国实时翻译 / 确定性三档报价 / 产能上报 / 交流洞察与档案；PIPL 合规内建（仅对话文本分析，无面部分析）。
### 附录 B：Demo 脚本
眼镜说"验货完成，两台 B300 序列号XX"→ 哈希上链 → EAS 盖章 → 托管放款。Sepolia 全程 < 2 分钟。

---

# English Summary (完整英文版 Full Version)

## 1. Executive Summary
**Fideight** (fides = trust + freight) is a **credit protocol for real-world trade**: capital verification, inspection, production and delivery become onchain, attested milestones. Funds are escrowed in smart contracts and released on evidence — bad actors get slashed. **CloudSail** is its field layer: a pair of AI glasses where one spoken sentence becomes structured, attested evidence.
> Datamora discovers onchain signals. Fideight makes every physical shipment verifiable. CloudSail captures the signal; Fideight prices and guarantees it.
Business model: a **protocol** (evidence + escrow), a **marketplace** (staked inspectors), and an **accounting engine** (settlement = ledger).

## 2. Problem
Trust in high-value cross-border trade (chips, equipment, commodities) costs **3–8% of order value** and never transfers: forged proof of funds, one-sided inspection reports, unverifiable progress, unpaid balances, manual reconciliation, human compliance screening. Decisions happen on site; the trust layer does not.

## 2.5 Forward-Deployed Engine (FDE) — Breaking AI Cold Start with People
**The question this answers: where do you get real scenarios and data for your agent?**
Instead of selling software Yiwu merchants won't buy — and instead of outsourcing headcount — we embed small **forward-deployed squads** (young engineers, bilingual operators) inside merchants' real operations: inquiry follow-up, inspection coordination, ledgers, cross-border collection, compliance screening. Service fees cover the humans; every delivery must leave reusable agent capability behind. **Three sides:** talent supply (they want real business track records — we pay in real scenarios plus chain-attested work history), merchant demand (3,700+ Yiwu merchants who need someone to get things done, not software), and the learning loop (each deployment returns templates, data and onchain attestations). **AI-native core:** traditional services are linear (`revenue = headcount × productivity`); ours are compounding (`the Nth client costs ~20% of the N−1th`), because the previous client's mistake became the next client's template. Each deployment must close with three deliverables: a reusable agent workflow, a structured scenario dataset, and an EAS attestation — and **any scenario appearing three times must be automated**. **Why Yiwu:** 3,700+ merchants in one market, cheap high-density visits, real cross-border pain — the cheapest data oilfield we have. The founder has worked Yiwu since her 2019 undergraduate thesis on two e-commerce villages and served as Yiwu Toastmasters president/area director since 2023, so the relationships are real, not a BD plan. Unit economics improve from ~30% GM (N=1, deliberately loss-making to buy data) to ~90% GM (N=100, SaaS + protocol fees). **Three iron rules:** no non-reusable private customization; no closing without all three deliverables; third occurrence → automate. **Moat:** each merchant's non-portable history of inspections, settlements and ledgers makes leaving expensive — solving FDE's classic "install and churn" problem.

## 3. Product
- **CloudSail (live, v1.0.12)**: voice→CRM, 15-language live translation, deterministic 3-tier quotes, production reporting, conversation insights & risk profiles. PIPL-compliant by design (text only, no facial biometrics).
- **Fideight (Sepolia demo ready)**: multimodal evidence → Merkle → SHA256 → **EAS attestation**; encrypted full text on IPFS; **MilestoneEscrow** releases USDC per milestone; **ERC-4337** gasless wallets with EIP-712 scoped authorization; stealth-address payouts; a compliance oracle screens every release (denied deals are blocked and logged); staked inspectors, slashing, Kleros-style arbitration; onchain double-entry accounting with tokenised, discountable invoices.

## 4. Confidential Communications
End-to-end encrypted evidence (libsodium sealed box, keys held by parties), **Nym mixnet** transport (no counterparty exposure), **PIR** private ledger queries, **ZK proof of solvency**, and selective disclosure for arbitration. Auditable AND private, by default.

## 5. Encrypted Settlement
Funds move only against attested milestones: escrowed USDC, gasless scan-to-authorize, typed EIP-712 limits (amount, milestones, expiry), stealth recipients, mandatory compliance oracle before any release. **No evidence, no release.**

## 6. Market & Business Model
First wedge: mid-size traders and factories in high-value cross-border trade. Revenue: **protocol fee 0.3–0.8%** of escrowed GMV (~95% GM), **marketplace take rate 10–15%** (~70% GM), **accounting SaaS ¥3–8k/seat/yr** (~85% GM); later, tokenised invoice discounting. CloudSail is the free capture funnel; Fideight monetises where money moves. **Global GTM (Q4 2026): a Product Hunt launch — the only B2B inspection-attestation play among consumer AI glasses, routed to our own landing page — plus a Kickstarter campaign (soft goal $50K, stretch $150K; tiers $199/$399/$999/$2,999) whose hardware pre-orders seed the L0 capture layer with real inspection scenarios.**

## 7. Moats
Field entry point (the 10 minutes when goods are in front of you) · evidence network effects (non-portable signed history and inspector reputation) · compliance-as-a-feature (blocked deals are onchain credentials) · deterministic core (formula engines, not LLM guesses) · **FDE × AI-native compounding (§2.5): the experience curve belongs to us — each deployment forces its human work into permanent agent capability, so cost per client falls while switching cost rises.**

## 8. Roadmap
M0 (today): Sepolia closed loop. M1 (0–6mo): 3 real escrowed trades, 3 CloudSail pilots. M2 (6–12mo): mainnet + USDC, 20-inspector beta, compliance oracle. M3 (12–24mo): invoice tokenisation, full Nym/PIR, open SDK.

## 9. Team & Ask
**Qianru (Carol Qianru Huang)**, Project Creator — front-line trade operations, CloudSail/Fluxa channels. Hiring: 1 Solidity engineer, 1 AIUI engineer, 1 inspection-channel partner. **Pre-seed $300K**: R&D 55% / compliance 15% / GTM 20% / ops 10%.

## 10. Risks
Regulatory (escrow-only, no token issuance, VASP partners) · oracle fraud (multi-source evidence + slashing + arbitration) · privacy vs. compliance (default E2E + selective disclosure) · cold start (free capture first).

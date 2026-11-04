# Fideight 商业计划书 · 底层章节：六层协议架构（中英双语）
# BP Foundation Chapter: The Six-Layer Protocol Architecture

> 本章作为商业计划书的"底层基础设施"章节（建议放在市场分析之后、商业模式之前），回答投资人最核心的问题：**你们的护城河在技术上到底长什么样，为什么别人复制不了？**

---

## 一图总览 Overview

```
L5 核算层 Accounting        链上复式记账 · 自动对账 · 审计即查询
L4 治理层 Governance        验货方质押 · 声誉 · 保证金扣减 · Kleros 仲裁 · 参数自调
L3 资金层 Settlement        MilestoneEscrow 里程碑托管 · ERC-4337 · USDC 放款
L2 证明层 Attestation       EAS 链上作证 · Merkle 哈希 · 选择性披露 · ZK
L1 数据层 Evidence          多模态证据打包 · 端侧加密 · PIR 私密查询
L0 采集层 Capture           CloudSail AI 眼镜 / 手机 PWA · 语音关键词触发
```

**一句话：L0 把"货在面前的 10 分钟"变成证据，L1–L2 把证据变成链上可信事实，L3 把事实变成钱，L4 让作假成本远高于作假收益，L5 让审计从"事后查账"变成"随时可查"。**

*L0 turns the 10 minutes in front of the goods into evidence; L1–L2 turn evidence into onchain truth; L3 turns truth into money; L4 makes cheating more expensive than it's worth; L5 turns auditing from retrospective into always-on.*

---

## L0 · 采集层 Capture Layer —— 物理世界的入口

**做什么：** CloudSail AI 眼镜（Rokid，v1.0.12 已上线）+ 手机 PWA（云帆 SOHO/脉客）。业务员在现场说一句「验货完成，序列号 XX」，语音关键词（验货/质检/收货/验资/序列号）自动触发取证流程；15 国语种实时翻译；客户微表情与现场观察自动记入档案。

**为什么难复制：** 验货公司没有硬件入口，硬件公司没有贸易场景。我们同时占有「货在面前的 10 分钟」和「业务员每天开口说的第一句话」——这两个入口决定了证据的真实性和连续性。

*What: Rokid AI glasses + mobile PWA. A single spoken phrase ("inspection complete, serial XX") triggers structured capture in 15 languages. Why it's hard to copy: inspection firms lack hardware; hardware firms lack trade workflows. We own both the 10 minutes in front of the goods and the salesperson's first sentence of the day.*

---

## L1 · 数据层 Evidence Layer —— 多模态证据打包 + 端侧加密

**做什么：** 照片/视频/语音/序列号打包成证据包；**SHA-256 哈希在设备端计算**，原始文件可不出手机/眼镜；libsodium 端侧加密，服务端只见密文；查询走 PIR（私密信息检索），连"谁在跟谁交易"都不会暴露。

**关键设计：** 证据哈希 ≠ 证据本身。买家验证的是哈希与元数据（时间戳、GPS、检验员 DID），原始影像只在用户授权后可见——**可审计与绝对保密同时成立**。

*What: multimodal evidence bundled; SHA-256 computed on-device; libsodium edge encryption; PIR for private queries. Key design: the hash is not the evidence — buyers verify hash + metadata, raw media stays private unless authorized. Auditable and confidential at the same time.*

---

## L2 · 证明层 Attestation Layer —— 让证据成为链上事实

**做什么：** 证据哈希通过 **EAS（Ethereum Attestation Service）** 盖章上链，任何人可在 easscan.org 验证；多份证据用 Merkle 树聚合，一次作证成本 **≈$0.001**（Base L2）；配合 ZK 证明实现"选择性披露"——证明"这批货验过且合格"，而不暴露"是哪批货、谁的货"。

**合规前置：** 证据上链前先过 **Compliance Oracle**（制裁名单、出口管制物项筛查）。命中即中止——**拒单也是协议能力，不是补丁**。

*What: evidence hashes attested onchain via EAS (verifiable on easscan.org), Merkle-aggregated at ~$0.001 per attestation, with ZK selective disclosure. Compliance oracle screens sanctions/export controls before attestation — denial is a protocol feature, not a patch.*

---

## L3 · 资金层 Settlement Layer —— 钱不动货不放，证据不到钱不出

**做什么：** **MilestoneEscrow 智能合约**（Solidity，Sepolia 已跑通）：买家 USDC 分里程碑锁定（定金 30% / 验货通过 40% / 签收 30%）；每个里程碑绑一个 EAS 证明哈希，哈希达标自动放款，无需人工对账。ERC-4337 智能钱包让买家不用懂 gas；EIP-712 实现限额授权；隐身地址保护付款方隐私。

**收费：** 协议费 0.3–0.8%/单；法币侧由 **Airwallex** 承接（130+ 币种、本地支付方式），与链上资金线隔离记账。

*What: MilestoneEscrow splits buyer USDC into milestones (30/40/30), each bound to an EAS hash; release is automatic on attestation. ERC-4337 removes gas friction; EIP-712 scoped authorization; stealth addresses. Fees 0.3–0.8% per order; fiat rail via Airwallex, kept in a separate ledger from onchain funds.*

---

## L4 · 治理层 Governance Layer —— 作假成本 > 作假收益

**做什么：** **验货方市场**：第三方验货师质押接单，虚假报告将被扣减保证金（slashing）；声誉分影响接单权重与佣金；争议走 **Kleros 去中心化仲裁**，7 天内出结果。

**递归自改进（RSI）：** 争议率 EMA 自动调风控阈值；履约良好的卖家押金与费率随声誉递减。仿真 500 卖家 × 60 epoch、恒定 10% 欺诈环境下：**总信任成本下降 86%，押金沉淀下降 81%**——系统在学，用户在省。

*What: staked inspectors, slashing for false reports, reputation-weighted dispatch, Kleros arbitration in ≤7 days. Recursive self-improvement: dispute-rate EMA tunes risk thresholds; good track records lower deposits and fees. Simulation: trust cost −86%, locked deposits −81% over 60 epochs.*

---

## L5 · 核算层 Accounting Layer —— 审计即查询

**做什么：** 每笔托管放款、保证金扣减、佣金自动产生**链上复式记账分录**（借/贷双录，事件即凭证）；买家、卖家、验货方三方账目天然一致；审计从"季度事后查账"变成"实时查询"。这也是 Fideight 的第三重身份——**核算工具**。

*What: every release, slash and fee emits onchain double-entry records; buyer, seller and inspector books agree by construction; auditing becomes a live query. This is Fideight's third identity — the accounting tool.*

---

## 层与层之间的关系（投资人常问）

| 问题 | 答案 |
|---|---|
| 哪一层是护城河？ | **L0 采集层**——别人有钱、有合约，但没有"货在面前 10 分钟"的物理入口 |
| 哪一层最先收费？ | **L3 资金层**（协议费 0.3–0.8%）与 **L2 证明层**（存证订阅 $1–2/次） |
| 哪一层最难？ | **L4 治理层**——质押、仲裁、参数自调需要真实争议数据喂养，所以先跑试点 |
| 哪一层带来网络效应？ | **L4 + L5**——验货方越多证据越可信，账本越完整生态越黏 |

---

## 里程碑（与融资节奏对齐）

| 阶段 | 目标 | 层 |
|---|---|---|
| 已完成 | Sepolia 闭环：眼镜取证 → /api/evidence → 哈希 → EAS payload（v1.0.12） | L0–L2 |
| 本季度 | MilestoneEscrow 主网审计 + 3 笔真实百万级托管交易；Airwallex 收款上线 | L3 |
| 未来 6 个月 | 验货方市场 MVP（质押 10 名验货师）；Kleros 仲裁接入 | L4 |
| 未来 12 个月 | 链上复式记账全面启用；双审计（合约 + 财务） | L5 |

---

## 附 · 社区冷启动：种子用户内测群｜Appendix: Community cold-start — the Seed Group

协议不是写完就有用户的。**L4 治理层需要真实争议数据喂养，L3 资金层需要真实托管流水，L0 采集层需要真实验货场景**——这三样都不能靠演示生成。所以我们上线一个**种子用户内测群**（云帆出海 · CloudSail Global Seed User Group），用"免费额度 + 一句真话"换取早期真实样本。

*A protocol doesn't ship with users. L4 governance needs real dispute data, L3 settlement needs real escrow volume, L0 capture needs real inspection scenarios — none of which demos can produce. So we launch a Seed User Group that trades free credits for honest feedback and early real samples.*

| 层 Layer | 种子群提供的燃料 What the group feeds it |
|---|---|
| L0 采集 Capture | 一线卖家的真实验货现场：50 次免费额度 × 前 20 位 = 1000 次真实存证样本 |
| L1 数据 Evidence | 多模态样本库（视频/照片/序列号）+ 隐私口径验证（哪些字段不能上链） |
| L2 证明 Attestation | 早期 EAS 交易哈希（可公开核验）+ 合规 Oracle 拒单样本 |
| L3 资金 Settlement | 首笔真实托管流水，证明 0.3–0.8% 协议费市场可接受 |
| L4 治理 Governance | 争议样本喂给 RSI 仿真器；首批 10 名质押验货师从群友中筛出 |
| L5 核算 Accounting | 真实双语对账数据，验证"结算即账本"叙事 |

*L0: 1,000 real attestation samples from 20 members × 50 free credits. L1: multimodal evidence corpus and privacy calibration. L2: public EAS hashes + compliance-denial samples. L3: first real escrow volume proving the 0.3–0.8% fee is market-acceptable. L4: dispute samples feeding the RSI simulator; the first 10 staked inspectors are recruited from group members. L5: real bilingual settlement data proving "settlement is the ledger".*

**运营节奏 Cadence：** 周一数据源投放（Amazon ABA / TikTok Shop / Google Trends）→ 周三一票真货拆解 → 周五答疑+版本发布。核心层封顶 20 人，防广告刷屏。

**完整运营包：** 见同目录 `内测种子群_运营全套_中英双语.md`（群公告、欢迎语、群规、邀约话术、30 天排期、KPI 看板，全部 ready 可直接复制）。

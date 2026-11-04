# 云帆出海 · CloudSail × Fideight

> **AI-Native 跨境信用协议** — 让每一票跨境货物，链上作证。
> *An AI-Native credit protocol for cross-border trade — every shipment, attested.*

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Stage: Pre-seed](https://img.shields.io/badge/stage-Pre--seed-yellow.svg)](docs/business-plan.md)
[![AI-Native](https://img.shields.io/badge/AI--Native-%E2%9C%93-purple.svg)](docs/ai-native.md)
[![Built at ETH Shenzhen](https://img.shields.io/badge/built%20at-ETH%20Shenzhen-blue.svg)](https://ethshenzhen.org)

---

## 这是什么 What is this

跨境高价值贸易（芯片、设备、大宗品）真正的成本不是货，是**信任的人工**——跟单、单证、验货、对账、催款、合规筛查，全靠人扛，信任成本高达交易额的 **3–8%**，且不可传递。

**云帆出海** 把这件事拆成两台机器：

- **CloudSail 云帆（现场引擎，已落地 v1.0.12）** — 业务员戴 AI 眼镜说一句话，对话自动变成结构化、可验证的证据：客户档案、验货记录、质检结论，哈希上链盖章。
- **Fideight（协议引擎，Sepolia Demo 已就绪）** — 证据多模态打包哈希 → EAS 链上公证 → 里程碑托管合约凭证据自动放款 USDC；验货方缴纳保证金接单、违规失格、争议走仲裁。

> 一句话定位：**CloudSail 采集信号，Fideight 为信号定价与担保。** 业务员的一个销售动作 = 一笔链上证据动作。

---

## 我们的 AI-Native 在哪儿 Where "AI-Native" actually lives

我们的 Agent 不是"一个功能"，而是整条贸易链的**调度层**：它先把订单拆成任务，逐个判断"这件事还需要人吗？"——AI 能做的自己做完（边际成本 ≈ 0），AI 做不了的才去质押市场匹配"最便宜的可信的人"（验货、到场、签字、担责）。

| 层 | 传统外贸 | 我们（AI-Native） |
|---|---|---|
| ① 感知原生 | 回公司填表、写报告 | 现场说一句话 → 直接结构化，15 国语言实时翻译 |
| ② 决策原生 | 凭经验拍脑袋报价 | 实时拉市场数据，敢输出"别打"（路演现场实算 −$57.85 亏损预警） |
| ③ 调度原生 | 养跟单/QC/翻译，验货找 SGS $300–800 | Agent 拆任务，只把"必须人到场"的环节去市场匹配，验货 $3–8 |
| ④ 结算原生 | 财务对账、催款、事后审计 | 证据上链达标 → 合约自动放款，链上复式分录即账本 |

**关键洞察：人只在三个不可替代点出现——物理到场、法律责任、争议裁决。其余全部由 Agent 承担。**

完整论述见 👉 [docs/ai-native.md](docs/ai-native.md)

---

## 六层协议架构 Six-layer architecture

```
L5 核算：链上分录 · 发票Token化 · ERP API
L4 市场：质押接单 · 声誉 · 保证金扣减 · 仲裁
L3 结算：MilestoneEscrow · USDC · AA钱包 · 隐身地址 · 合规Oracle
L2 隐私：E2E加密 · Nym mixnet · PIR · ZK证明
L1 证据：多模态→Merkle→SHA256→EAS · IPFS加密存储
L0 采集：云帆眼镜/手机PWA（语音→结构化→证据）
```

业务员的销售动作即链上证据动作——这是独有的入口壁垒。详见 [docs/architecture.md](docs/architecture.md) 与 [docs/business-plan.md](docs/business-plan.md)。

---

## 商业模型 Business model

| 收入线 | 定价 | 毛利 |
|---|---|---|
| 协议费 | 0.3–0.8% / 托管交易额 | ~95% |
| 验货市场 | GMV 抽成 10–15% | ~70% |
| 核算 SaaS | ¥3k–8k / 席 / 年 | ~85% |
| CloudSail 订阅+硬件 | 见产品页 | 25–35% |

钩子：**CloudSail 免费采集 → Fideight 托管收协议费 → 验货市场抽成 → 核算订阅。** 先免费把证据攒起来，再在钱经过的地方收费。

---

## 路线图 Roadmap

| 阶段 | 时间 | 里程碑 |
|---|---|---|
| M0 Demo | 现在 | EAS + 托管 Sepolia 闭环（已就绪） |
| M1 试点 | 0–6 月 | 3 笔真实托管交易；CloudSail 3 家展会试点 |
| M2 主网 | 6–12 月 | 主网 + USDC；验货市场内测 20 名验货方；合规 Oracle 上线 |
| M3 生态 | 12–24 月 | 发票 Token 化贴现；Nym/PIR 隐私层全量；开源 SDK |

---

## 在线站点 Live site

本项目已部署为 GitHub Pages，可直接在浏览器访问所有产品与文档页面（位于仓库根目录的 `*.html`）：

- 首页 / 技术架构 / 商业计划 / 竞品分析 / 原型 / 路演 / 收款 / 种子群 / 众筹 / 眼镜 / 联系

> 把仓库名保持为 `cloudsail-fideight` 即可让 Pages 站点与下方链接一致。

---

## 快速开始：跑通 Sepolia 演示 Quick start (Sepolia demo)

无需主网、无需真实资金，约 1 小时即可跑通"眼镜拍证据 → 哈希 → EAS 盖章 → 托管放款"的闭环：

```bash
# 1) 钱包：MetaMask 切到 Sepolia 测试网，领测试币
# 2) 注册 Schema：https://sepolia.easscan.org/schema/new
#    粘贴：string orderRef,string item,string quantity,string evidenceHash,string inspector,string remark
# 3) 发证明：
cd docs   # 或仓库根目录的 eas/ 示例
npm init -y && npm i ethers @ethereum-attestation-service/eas-sdk
export PRIVATE_KEY=你的测试私钥 SCHEMA_UID=刚拿到的UID
node attest.js
# 4) 跑后端（上传验货照片拿 evidenceHash 再 attest）：
pip install fastapi uvicorn python-multipart
uvicorn attest_api:app --port 8001
```

完整部署清单见 [Fideight 区块链起步套件说明](docs/architecture.md)。

---

## 本仓库包含什么 / 不含什么 Scope & privacy

**✅ 已开源（可对外）**
- 产品官网全部页面（根目录 `*.html` + `style.css` + `assets/`）
- 核心技术文档：`docs/` 下 AI-Native 说明、商业计划、六层架构、FDE 前向部署、眼镜 OEM 规格、竞品分析、众筹 GTM、市场调查、行动指南、AIsa 反向工程
- 快速部署脚本与演示说明

**🔒 未公开（涉及隐私与商业敏感）**
- 创始人私人特质档案、保密/竞业协议、内部成本与法务证据包、内部作战与融资明细等，均不纳入此仓库。

---

## 加入我们 / 联系 Join & contact

- 🌟 如果这个项目的前景打动你，**请 Star 本仓库**——这是开源项目被更多人看到的最直接方式。
- 跨境卖家（有真实在跑订单）· 工厂/供应商（接受验货方到场）· 验货方/货代（首批 10 席质押入驻）——[加入种子用户内测群](seed.html)
- 微信 `huoban999zhq`（备注「平台+品类」，如 `Amazon US + 3C`）
- 招募：Solidity 工程师 ×1、CloudSail AIUI 工程师 ×1、验货渠道合伙人 ×1

---

## 法律声明 Disclaimer

本仓库内容用于**产品与愿景展示**，所有演示均运行在 Sepolia 测试网，不涉及真实资金与代币发行。我们仅提供托管与结算技术，**不发行任何代币、不提供投资建议**。跨境金融业务需依当地牌照（VASP 等）合规开展。

---

*Builder: Qianru（Carol Qianru Huang）· ETH Shenzhen 2026 · Built with WorkBuddy*

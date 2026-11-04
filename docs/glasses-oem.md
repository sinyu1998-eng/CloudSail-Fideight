# CloudSail 验货官眼镜 · OEM/ODM 功能规格书（华强北制造侧）

> **文档用途**：给华强北眼镜/智能硬件制造伙伴（老板/工程负责人）的**量产功能规格与分工说明**。它回答三件事：① 我们要造一副什么样的眼镜；② 工厂需要交付什么；③ 工厂能获得什么（不只是加工费，还有协议层的持续分成）。
> *Purpose: an ODM functional spec and division-of-labour brief for Huaqiangbei manufacturing partners. It answers: what we build, what the factory delivers, and what the factory earns (not just a build fee, but recurring protocol revenue).*

> **战略底牌**：市面 AI 眼镜（含朋友 Monako）全是"消费级玩具"——拍 vlog、跑 Agent、看通知。我们这副是**全球首款"会作证的 AI 验货眼镜"**：现场拍一张货、说一句"验货完成"，证据哈希立刻上链，托管款自动放行。**眼镜不是卖点，眼镜是"可信贸易的入口"**。
> *Strategic edge: consumer AI glasses are toys. Ours is the world's first AI inspection glass that attests — capture a unit, say "inspection done", the evidence hash goes onchain and escrow auto-releases. The glass is the entry point to a trust network, not the product itself.*

---

## 0. 给谁看 · 怎么用这份文档
*Who reads this & how*

- **华强北老板/工程 PM**：照第 2 节硬件规格评估你们产线能否做、BOM 多少、交期多长。
- **我们（CloudSail/Fideight）**：负责软件栈、链上协议、品牌、渠道与分成，不碰硬件生产。
- **合作模式**：ODM（工厂出方案+产线）或 JDM（联合定义）。软件与协议 100% 归我们，硬件设计版权共享、量产权归工厂。

---

## 1. 产品定位：与消费级眼镜的根本区别
*Positioning vs consumer glasses*

| 维度 | 消费级（Monako / Ray-Ban Meta 等） | CloudSail 验货官眼镜 |
|---|---|---|
| 用途 | 拍日常、跑 Agent、看通知 | **跨境贸易验货 + 链上作证** |
| 核心动作 | 拍摄/语音助手 | 一键采集证据 → 哈希上链 → 触发托管放款 |
| 摄像头要求 | 够清晰即可 | **必须能读序列号/QC 标（微距）+ 仓储弱光可用** |
| 麦克风要求 | 安静环境 | **工厂/码头嘈杂环境可用（骨传导降噪）** |
| 联网 | 配手机 | 现场常无网 → 需**离线哈希 + 回传** |
| 变现 | 硬件一次性 | 硬件 + 存证额度订阅 + 协议费分成（持续） |

> 一句话给老板听：**"你造一副能戴一天的眼镜，我把它变成每个跨境卖家都想要的'验货证据机器'，卖出去的钱我们按协议长期分。"**
> *One-liner for the factory: "You build an all-day glass; we turn it into an inspection-evidence machine every cross-border seller wants — and we split the recurring revenue."*

---

## 2. 硬件功能规格（工程目标值）
*Hardware functional spec — engineering targets*

> 以下为 v2 自研 ODM 目标值。v1 已用 **Rokid AIUI 参考设计**跑通软件与协议闭环（证明需求成立），v2 迁移到自有硬件以降本、控交期。
> *These are v2 ODM targets. v1 already proved the software+protocol loop on a Rokid AIUI reference design; v2 moves to own hardware to cut BOM and control lead time.*

### 0101 计算 Compute
| 项 | 目标 | 备注 |
|---|---|---|
| SoC | Qualcomm Snapdragon AR1（同 Monako 已验证） | 备选：中端 SoC 做 BOM 降档版（Super Early Bird 档用） |
| CPU | 4× Cortex-A55 @ 2.0 GHz | |
| NPU | ≥2 TOPS INT8 | 跑端侧 OCR/语音唤醒，不上云也能初筛 |
| 平台 | Linux 5.10+ arm64 / 或 Rokid AIUI 兼容层 | 自有 Capture OS 后续 fork |

### 0202 采集与显示 Capture & Display
| 项 | 目标 | 为什么验货需要 |
|---|---|---|
| 主摄 | 12–16 MP，自动对焦，**微距模式**（5cm 可读序列号） | 验货核心是"看清序列号/铭牌/QC 标" |
| 视频 | ≥1080p@30fps，仓储弱光可用（大像素/夜视辅助） | 仓库、码头光线差 |
| 环境/广角副摄 | 可选 120° 上下文镜头 | 记录"货在哪一排、和谁同框" |
| 显示 | 波导 MicroLED，≥1200 nits，阳光下可读 | 户外/仓库强光下看结论 |
| 显示色 | 基线单色绿（降本），升级版全彩 | 全彩利于读 QC 颜色标，但贵 |
| 刷新率 | ≥60 Hz | |

### 0303 形态与佩戴 Form
| 项 | 目标 |
|---|---|
| 重量 | **≤50 g**（对标 Monako 48g，普通墨镜重量） |
| 配重 | 后镜腿配重，全天佩戴不压鼻 |
| 形态 | 标准眼镜框，支持**处方镜片** |
| 尺寸 | 待定（EVT 锁定） |

### 0404 音频与麦克风 Audio & Mic
| 项 | 目标 | 为什么 |
|---|---|---|
| 主麦 | **骨传导麦克风（鼻托位，拾鼻腔振动）** | 工厂/码头嘈杂环境隔离环境噪音，和 Monako 同方案 |
| 副麦 | 2–3 颗气导麦，波束成形 | 远场拾音、降风噪 |
| 扬声器 | 集成开放式扬声器 | 语音播报"证据已上链" |

### 0505 电池与续航 Battery
| 项 | 目标 |
|---|---|
| 容量 | ≥300 mAh（基线，对标 Monako） |
| 亮屏续航 | ≥4 h |
| 常规使用 | ≥8 h |
| 充电 | Type-C / 触点充电盒（选配） |

### 0606 传感器与交互 Sensors & Wear
| 项 | 目标 | 验货用途 |
|---|---|---|
| 物理抓拍键 | **必备，手套可操作** | 一键"验货完成"→ 触发证据包（消费级眼镜没有，这是我们的刚需差异点） |
| IMU | 六轴 | 防抖、姿态标记 |
| GPS/北斗 | 必备 | **证据带地理位置**（"货在深圳仓，非海外"） |
| 手势 | Vision Engine 微手势（捏合/抬手） | 免触操作 |
| 触控 | 镜腿触控条 / 智能指环（选配） | |

### 0707 连接与合规 Connectivity & Compliance
| 项 | 目标 |
|---|---|
| 无线 | Wi-Fi + BT 5.x；**选配 eSIM/4G**（现场无手机也能传） |
| 加密 | 端侧 libsodium sealed box；传输经 Nym mixnet（隐私档选配） |
| 认证 | 强制：CCC（国内）、CE/FCC（出海）、**光生物安全 IEC 62471 / GB** 眼睛安全、RoHS |
| OTA | 支持云端固件/App 远程升级 |

---

## 3. 软件与 AI 功能（我们负责，工厂无需做）
*Software & AI — owned by us*

- **CloudSail Capture OS**：语音→结构化（抽产品/数量/目的地/顾虑）、**15 国语言实时翻译**、OCR 序列号/质检单识别。
- **端侧哈希**：SHA-256 + Merkle 打包，原始证据加密存 IPFS/Arweave，**链上只存哈希与状态**。
- **Fideight 存证 SDK**：证据包自动 `POST /api/evidence` → EAS 盖章（Base/Sepolia）→ 返回可公开核验的 Attestation UID。
- **一键作证流**：按抓拍键 → 抽字段 → 哈希 → 上链 → **自动触发 MilestoneEscrow 按里程碑放款**。
- **无感钱包**：ERC-4337 嵌入式账户，眼镜/手机扫码授权（EIP-712 限定金额/里程碑/有效期），业务员不懂 Gas 也能用。
- **合规拦截**：每次放款前过合规 Oracle（被制裁方/出口管制筛查），未过即永久拒绝并链上留痕——**拒单是卖点**。

---

## 4. 工厂需要交付的接口（接入要求）
*Integration interfaces the factory must expose*

| # | 接口 | 要求 |
|---|---|---|
| 1 | 摄像头帧 | 标准 API 暴露给 Capture OS（YUV/RGB 流） |
| 2 | 麦克风 | 骨传导+气导多路混流，低延迟 |
| 3 | 抓拍键 | 硬件中断 → 系统事件，可被 App 订阅 |
| 4 | GPS | 地理位置注入证据元数据 |
| 5 | OTA | 云端可推固件/App |
| 6 | 钱包授权 | 二维码/ NFC 扫码触发 EIP-712 授权（规划） |

---

## 5. 我们需要工厂提供的（量产侧）
*What we need from the factory*

| 项 | 要求 |
|---|---|
| **BOM 目标** | Inspector Kit（含眼镜）硬件 BOM **≤ $160**，才能守住众筹 $399 档 ~35% 毛利 |
| **认证** | 代出 CCC/CE/FCC 测试资源与报告；光生物安全必过 |
| **阶段** | EVT（工程样）→ DVT（设计验证）→ PVT（量产验证），每阶段交付标准见第 7 节 |
| **MOQ / 交期** | 首批量产 MOQ 协商（建议 1k–3k）；EVT 样机 4–6 周，PVT 后量产 8–10 周 |
| **开模/tooling** | 框体/镜腿私有模具费用与周期报价 |
| **品控** | 来料检验、整机老化、出货前功能自检（抓拍键/哈希流程冒烟测试） |

---

## 6. 工厂能拿到的（价值主张 / 分成模型）
*What the factory earns — the recurring upside*

> 这不是一单加工费。每卖出一副 CloudSail 眼镜 = 一个**已验证的链上验货端点**，持续产生存证与协议费。

- **加工费**：硬件量产合理毛利（行业惯例）。
- **协议分成**：眼镜激活后产生的**存证额度订阅 + 托管协议费**，按约定比例长期返给制造伙伴（具体比例 JDM 协议定）。
- **品牌共担**：进入 CloudSail × Fideight 出海渠道（众筹 Kickstarter、Product Hunt、跨境贸易服务商网络）。
- **技术背书**：成为"全球首款会作证的 AI 眼镜"的量产地，对外可讲。

---

## 7. 验收标准（关键项）
*Acceptance criteria — key items*

| 阶段 | 必须通过 |
|---|---|
| **EVT** | 抓拍键→证据包→哈希上链全链路打通；重量≤50g；骨传导麦嘈杂环境可识唤醒词 |
| **DVT** | 微距读序列号成功率 ≥95%；GPS 元数据准确；CE/FCC 预测试通过 |
| **PVT** | 量产一致性（抽检 30 台功能全过）；光生物安全报告齐；OTA 升级无 brick |

---

## 8. 与 Monako 等消费级眼镜的差异化对比
*Differentiation vs Monako-class glasses*

| 能力 | Monako（朋友，消费级） | CloudSail 验货官（我们） |
|---|---|---|
| 定位 | 开发者玩具 / 氛围编程 | B2B 贸易验货 + 链上作证 |
| 抓拍键 | 无强调 | **必备，手套可操作（一键作证）** |
| 微距读码 | 未强调 | **必备（序列号/QC 标）** |
| 地理位置 | 未强调 | **必备（证据带位置）** |
| 链上作证 | 无 | **EAS 存证 + 托管自动放款** |
| 变现 | 硬件一次性 | 硬件 + 存证订阅 + 协议分成 |
| 麦克风 | 骨传导（嘈杂可用）✓ | 骨传导（嘈杂可用）✓ 同方案 |
| 重量/显示/电池 | 48g / 波导 / 300mAh | ≤50g / 波导 / ≥300mAh（同代际） |

> 结论：硬件代际我们与 Monako 同档（证明供应链可行），**差异全在"验货作证"功能与协议闭环**——这正是工厂无需重投、而我们能持续收费的部分。
> *Takeaway: we share Monako's hardware generation (supply chain proven); the difference is the inspection-attestation function and protocol loop — exactly the part the factory needn't re-invest in, and the part we monetise recurring.*

---

## English Version

### CloudSail Inspector Glass — ODM Functional Spec (Huaqiangbei Manufacturing Side)

**Purpose.** An ODM spec and division-of-labour brief for Huaqiangbei hardware partners: what we build, what the factory delivers, and what it earns (recurring protocol revenue, not just a build fee).

**Positioning.** Consumer AI glasses (incl. Monako) are toys — vlogs, agents, notifications. CloudSail is the **world's first AI inspection glass that attests**: capture a unit, say "inspection done", the evidence hash goes onchain and escrow auto-releases. The glass is the entry point to a trust network, not the product.

**Hardware targets (v2 ODM).** Compute: Snapdragon AR1 (proven on Monako) or BOM-down mid SoC; NPU ≥2 TOPS. Capture: 12–16 MP AF with **macro (5 cm, reads serials/QC marks)**, 1080p low-light video, optional 120° context cam. Display: waveguide MicroLED ≥1200 nits, mono-green baseline / colour upgrade. Form: **≤50 g**, rear-weighted, prescription-ready. Audio: **bone-conduction mic at nose-bridge** + 2–3 beam-formed mics (noisy factory proven). Battery: ≥300 mAh, ≥4 h screen-on. Sensors: **glove-operable physical capture button (must-have, our differentiator)**, IMU, **GPS/BeiDou (geo-tagged evidence)**, Vision-Engine gestures. Connectivity: Wi-Fi + BT, optional eSIM/4G; libsodium + Nym privacy; mandatory CCC/CE/FCC + IEC 62471 eye-safety; OTA.

**Software (ours).** CloudSail Capture OS: voice→structured, 15-language translate, OCR serials; on-device SHA-256 + Merkle; Fideight attest SDK `POST /api/evidence` → EAS; one-tap capture→hash→onchain→auto MilestoneEscrow release; ERC-4337 gasless wallet with scan-to-authorize; compliance oracle blocks denied deals pre-release.

**From the factory.** BOM ≤ $160 for the $399 Inspector Kit (to hold ~35% GM); CCC/CE/FCC + eye-safety reports; EVT→DVT→PVT with the key acceptance items above; MOQ 1k–3k; tooling quote.

**For the factory.** Build fee + **recurring protocol revenue share** on attestation subscriptions and escrow fees from every activated glass; entry to CloudSail×Fideight overseas channels (Kickstarter, PH, trade-service network); "world's first attesting AI glass" manufacturing credit.

**Acceptance.** EVT: capture→hash→onchain loop closed, ≤50 g, bone-conduction wake in noise. DVT: macro serial read ≥95%, accurate GPS, pre-CE/FCC pass. PVT: 30-unit batch all-pass, eye-safety report, OTA no-brick.

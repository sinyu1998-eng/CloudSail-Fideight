# 为什么是他们失败、为什么是我们
# Why They Failed, Why Now, Why Us

> 版本 v1 · 2026-11-04 · 中文为主，每节附英文摘要
> 用途：投资人问答弹药库 / 播客 EP 素材 / 团队共识

---

## 0. 我们要做的事，早就有人做过 What we're doing has been tried

"让跨境贸易的信任可验证、让货款按履约自动结算"——这不是新想法。过去十年，至少有六拨人用六种姿势试过。他们大多死了，而且死法惊人地一致。

*The idea isn't new. At least six waves of players tried it over the past decade. Most are dead — and they died the same way.*

## 1. 先烈名录 The graveyard

| 玩家 | 做了什么 | 结局 | 死因一句话 |
|---|---|---|---|
| **TradeLens**（马士基 × IBM，2018–2023） | 航运数据上链联盟 | 2023 年 1 月关停，官方理由"商业可行性不足" | **联盟治理死锁**：竞争对手不愿进对手主导的网 |
| **we.trade**（12 家银行联盟，2017–2022） | 区块链贸易融资平台 | 2022 年破产清算 | **为银行的合规舒适而建，不为商户的痛而建** |
| **Marco Polo Network**（2017–2023） | 应收账款融资网络 | 2023 年资不抵债 | 转型无门，融资断粮 |
| **Tradeshift**（2010–） | 发票网络+供应链金融 | 多年挣扎、估值缩水 | 网络效应没起来前资金链先断 |
| **阿里 Trade Assurance** | 平台担保交易 | 活着，但锁在平台内 | 信任不可携带，数据是平台的不是你的 |
| **SGS / BV / TÜV 验货** | 物理验货报告 | 活着，但 $300–800/次、慢 | 信任靠"人工科层"背书，成本降不下来 |

*TradeLens (Maersk×IBM) shut down Jan 2023 citing "insufficient commercial viability". we.trade went bankrupt 2022. Marco Polo insolvent 2023. The survivors — Alibaba Trade Assurance and SGS — work, but trust is locked inside their walls and priced by human bureaucracy.*

## 2. 六种死法其实是同一种 The six deaths are one death

把尸体解剖完，失败的共同结构是五条：

1. **联盟治理死锁**。TradeLens 们想让竞品共享数据，竞品凭什么？委员会投票投不出产品迭代。
2. **冷启动无楔子**。双边网络没有单点楔子：没有足够多的买家，卖家不来；没有卖家，买家不来。全都死于"差一口气到临界规模"。
3. **数据沉淀在别人家**。Trade Assurance 的信任记录搬不走，商户没有动力把核心数据交给平台。
4. **验证环节没有变便宜**。这是最根本的：他们数字化了纸面流程，但**"货在面前、需要人去看"这个物理环节的成本结构一点没变**——还是人、还是差旅、还是报告。
5. **先讲区块链故事，没有物理证据锚点**。链上记的是"某人说货没问题"，而不是"证据本身"。Garbage in, gospel out.

*One anatomy: consortium deadlock; no wedge for cold start; data captured by the platform; **verification never got cheaper**; and blockchain narratives without a physical evidence anchor.*

## 3. 为什么 AI Agent 时代不一样了 Why the agent era changes the equation

五条死因，AI Agent 时代逐条有解：

| 死因 | 当时的无解 | 现在的有解 |
|---|---|---|
| 验证成本不降 | 验货只能靠人出差写报告 | **AI 眼镜一句话→结构化证据**，边际成本 $300–800 → $3–8 |
| 冷启动无楔子 | 等平台两边都够多 | **FDE 前向部署**：先用服务收费把单边喂饱，数据回流训练 Agent |
| 信任不可携带 | 平台数据孤岛 | **EAS 标准化证明**：证据哈希任何人可验证，声誉上链跟人不跟平台 |
| 联盟治理死锁 | 委员会投票 | **协议治理**：规则写进合约，费率由代码执行，不靠开会 |
| 钱不敢交给 AI | AI 会幻觉，账本不能猜 | **确定性内核**：LLM 只做理解，金额/放款走公式引擎 |

外加两个时代红利：稳定币结算轨道（USDC）已成熟可用；MCP/Agent 生态（AllyNext、DeepSeek Harness）给了十年前不存在**的分发通道**——我们的工具可以直接挂进别人已经在用的 Agent 里。

*Every cause of death now has an answer: glasses collapse the physical-verification cost; FDE feeds one side before the network exists; EAS makes attestations portable; contracts replace committee votes; deterministic cores let money move without trusting a probability model. Plus two tailwinds: mature stablecoin rails and the MCP/agent distribution channel that didn't exist ten years ago.*

## 4. 为什么是我们 Why us specifically

风口对了不代表轮到你。我们的差异不在想法，在三个别人凑不齐的组合：

1. **现场入口**：我们是从义乌工厂现场长出来的（2019 年田野、Toastmasters 深耕、90+ 店铺真实流水），不是从白皮书里长出来的。TradeLens 死于没有人在码头现场。
2. **先收钱、后协议**：FDE 服务费让我们第一天就有现金流和真实数据，先烈们全是"先烧钱建网络、赌临界规模"。
3. **克制**：我们明确知道 AI 不能碰账本。先烈们要么全信人（SGS），要么全信链（we.trade），我们是"AI 理解人、公式管钱、合约执行"的三角结构。

*Our edge isn't the idea — it's three assets others can't assemble at once: we grew from the factory floor, not a whitepaper; services revenue feeds us from day one instead of burn-till-critical-mass; and we keep AI away from the ledger.*

## 5. 诚实的风险 Honest risks

同样的话术也提醒我们：如果**验货成本没有真的降下来**（眼镜渗透不及预期），如果我们**3 笔真实托管交易跑不通**（M1 里程碑），我们就只是在给这个坟墓添一块新碑。所以路线图把"3 笔真实交易"放在 M1 最前面——它是生死验证，不是装饰。

*Honest check: if verification cost doesn't actually fall, or if we can't close 3 real escrowed trades, we're just another headstone. That's why M1 is a life-or-death test, not a decoration.*

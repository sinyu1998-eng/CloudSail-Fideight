# 存储架构决策：链下数据，链上只存哈希
# Storage ADR — Off-chain data, on-chain hash only

> 版本 v1 · 2026-11-04

## 决策 Decision

证据数据（照片、验货报告、谈判纪要）**不上主链**，存 **IPFS 或 Arweave**；主链（EAS Attestation）只存 **32 字节 sha256 哈希 + 链下指针（CID/txid）**。

*Evidence payloads live off-chain (IPFS / Arweave); the chain stores only a 32-byte hash plus a pointer.*

## 为什么 Why

| 方案 | 成本 | 持久性 | 适用 |
|---|---|---|---|
| 全量上主链 | 1KB ≈ 数万 gas，一张照片成本不可接受 | 永久 | ❌ 只用于哈希 |
| **IPFS（Pinata 多端 pin）** | 近乎免费 | 依赖 pinning | 热数据、需更新的证据包 |
| **Arweave（Irys）** | 一次付费永久存储（~$5/GB 级） | 永久 | 终局归档、不可变凭证 |

上链的只有哈希，意味着：① 成本固定且可忽略；② 商业敏感内容天然不在公链裸奔（配合端到端加密，见 business-plan §5）；③ 任何人拿到 CID 都能独立验证哈希 = 可审计与可保密同时成立。

## 实现 Implementation

- 脚本：`scripts/evidence-archive.js`（零依赖 Node，支持 `--mode ipfs|arweave|mock`）
- EAS schema 里 `evidenceHash` 存 sha256，`remark` 存 CID/txid 指针
- 真实上传需要 `PINATA_JWT`（IPFS）或 `ARWEAVE_JWK_PATH` + @irys/sdk（Arweave）；无密钥时 mock 模式跑通全流程

```bash
node scripts/evidence-archive.js --mode ipfs --ref SN-B300-0021 --item "工业无人机" --file photo.jpg
# 输出 evidenceHash + IPFS gateway + 可直接喂给 EAS 的字段
```

#!/usr/bin/env node
/**
 * evidence-archive.js · 证据存证归档脚本
 * =====================================
 * 原则（用户拍板的架构决策）：
 *   数据放链下（IPFS / Arweave），主链只存 32 字节哈希（EAS Attestation）。
 *   Payload → IPFS（可热更新、可 pinning）或 Arweave（一次付费、永久存储）
 *   Onchain → sha256(payload) via EAS，schema 里只带 CID/txid 引用
 *
 * 用法 Usage:
 *   # MOCK 模式（无密钥，输出演示 CID/txid）
 *   node evidence-archive.js --ref SN-B300-0021 --item "工业无人机" --qty 2
 *
 *   # 真实 IPFS（Pinata）
 *   export PINATA_JWT=xxx
 *   node evidence-archive.js --mode ipfs --ref SN-B300-0021 --item "工业无人机" --file photo.jpg
 *
 *   # 真实 Arweave（Irys，推荐 <100KB 免费节点）
 *   export ARWEAVE_JWK_PATH=./wallet.json
 *   node evidence-archive.js --mode arweave --ref SN-B300-0021 --item "工业无人机" --file photo.jpg
 *
 * 产出 Output: 证据包哈希 + CID/txid + 可贴进 EAS schema 的 evidenceHash 字段
 */

'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// ---------- 参数解析 ----------
const args = process.argv.slice(2);
function arg(name, dflt) {
  const i = args.indexOf('--' + name);
  return i >= 0 && args[i + 1] ? args[i + 1] : dflt;
}
const MODE  = arg('mode', 'mock');           // mock | ipfs | arweave
const REF   = arg('ref', 'DEMO-0001');
const ITEM  = arg('item', '工业级无人机');
const QTY   = arg('qty', '1');
const FILES = args.flatMap((a, i) => (a === '--file' && args[i + 1]) ? [args[i + 1]] : []);
const INSPECTOR = arg('inspector', 'field-inspector');

// ---------- 打包证据 ----------
function buildBundle() {
  const photos = FILES.map(f => {
    const buf = fs.readFileSync(f);
    return { name: path.basename(f), sha256: crypto.createHash('sha256').update(buf).digest('hex'), bytes: buf.length };
  });
  return {
    orderRef: REF, item: ITEM, quantity: QTY, inspector: INSPECTOR,
    capturedAt: new Date().toISOString(),
    photos,
    schema: 'string orderRef,string item,string quantity,string evidenceHash,string inspector,string remark'
  };
}

// ---------- IPFS（Pinata） ----------
async function toIPFS(bundle) {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) throw new Error('缺少 PINATA_JWT 环境变量');
  const fd = new FormData();
  fd.append('file', new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' }), `evidence-${REF}.json`);
  const r = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST', headers: { Authorization: `Bearer ${jwt}` }, body: fd
  });
  if (!r.ok) throw new Error(`Pinata ${r.status}: ${await r.text()}`);
  const { IpfsHash } = await r.json();
  return { cid: IpfsHash, gateway: `https://ipfs.io/ipfs/${IpfsHash}`, permanence: 'pinning 依赖 Pinata，建议同时多端 pin' };
}

// ---------- Arweave（Irys） ----------
async function toArweave(bundle) {
  const jwkPath = process.env.ARWEAVE_JWK_PATH;
  if (!jwkPath) throw new Error('缺少 ARWEAVE_JWK_PATH 环境变量（Arweave 钱包 JSON）');
  const jwk = JSON.parse(fs.readFileSync(jwkPath, 'utf8'));
  // Irys node2（小额免费档）：构造 DataItem 需签名；此处走 arweave.net 直连交易为演示
  // 生产建议接入 @irys/sdk
  const data = Buffer.from(JSON.stringify(bundle, null, 2));
  // —— 简化演示：用 arweave 钱包直接发交易（余额需 >0）——
  // 若不想引依赖，可用 Irys HTTP 接口：POST https://node2.irys.xyz/tx （需预充值）
  const arweave = null; // 生产环境：import Arweave from 'arweave'
  void arweave;
  throw new Error('Arweave 真实上传需引入 @irys/sdk 或 arweave.js；详见注释，mock 模式可先看流程。\n' +
    `  钱包地址可从 ${jwkPath} 派生（n=${(jwk.n||'').slice(0,12)}...），数据 ${data.length} bytes`);
}

// ---------- 主流程 ----------
(async () => {
  const bundle = buildBundle();
  const payload = JSON.stringify(bundle);
  const evidenceHash = '0x' + crypto.createHash('sha256').update(payload).digest('hex');

  let out;
  if (MODE === 'ipfs') {
    out = await toIPFS(bundle);
  } else if (MODE === 'arweave') {
    out = await toArweave(bundle);
  } else {
    // MOCK：确定性模拟 CID（仅演示结构，非真实 IPFS）
    const fakeCid = 'bafy' + evidenceHash.slice(2, 52);
    out = { cid: fakeCid, gateway: `https://ipfs.io/ipfs/${fakeCid}`, permanence: 'MOCK 演示 CID（未真实上传）' };
  }

  console.log(JSON.stringify({
    mode: MODE,
    evidenceHash,                       // ← 唯一上链的字段（32 字节）
    storage: out,                       // ← 数据在链下
    eas: {
      schema: bundle.schema,
      fields: { orderRef: REF, item: ITEM, quantity: QTY, evidenceHash, inspector: INSPECTOR, remark: out.cid }
    },
    next: '用此 evidenceHash + remark(CID) 调 EAS attest（见 docs/llm-integration.md §3）'
  }, null, 2));
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });

#!/usr/bin/env node
/**
 * Fideight 私有 MCP 服务器 · Fideight Private MCP Server
 * ====================================================
 * 给 DeepSeek Harness (dsh) / 任何 MCP 客户端接入的三个业务工具：
 *   1) evidence.verify     验货证据核验：输入 SN/订单号，返回哈希、上链时间、抓拍图
 *   2) escrow.create       生成里程碑托管合约（测试网），返回合约地址与托管链接
 *   3) compliance.check    出口合规筛查：输入国家+产品，返回通过/拦截
 *
 * 协议：MCP (Model Context Protocol) over stdio，JSON-RPC 2.0
 * 零依赖（纯 Node），方便在沙箱/展会现场直接跑。
 *
 * 运行 Run:
 *   node fideight-mcp.js
 *
 * 在 DeepSeek Harness 中注册（MCP 配置示例）：
 *   {
 *     "mcpServers": {
 *       "fideight": {
 *         "command": "node",
 *         "args": ["/path/to/fideight-mcp.js"]
 *       }
 *     }
 *   }
 *
 * 数据说明：当前为 MOCK 模式（返回结构一致的演示数据）。
 * 生产环境把每个 tool 里标注 TODO 的部分替换为真实后端调用
 * （CloudSail /api/evidence、Fideight MilestoneEscrow、合规 Oracle）。
 */

'use strict';

const readline = require('readline');

// ---------- 业务实现（MOCK） ----------

function sha256hex(s) {
  return require('crypto').createHash('sha256').update(s).digest('hex');
}

const tools = {
  'evidence.verify': {
    description: '核验一票货的链上验货证据。输入产品/序列号或订单号，返回证据哈希、上链时间、抓拍图 URL、验货方。',
    inputSchema: {
      type: 'object',
      properties: {
        ref: { type: 'string', description: '订单号或产品序列号，如 SN-B300-0021' },
        item: { type: 'string', description: '品名，可选' }
      },
      required: ['ref']
    },
    handler: ({ ref, item }) => {
      // TODO(生产): 调 CloudSail GET /api/evidence?ref=...
      const hash = sha256hex(`evidence:${ref}:${Date.now()}`);
      return {
        ref,
        item: item || '工业级无人机 Industrial drone',
        evidenceHash: '0x' + hash,
        attestedAt: new Date().toISOString(),
        attestation: `EAS attestation on Sepolia · schema UID demo-${hash.slice(0, 8)}`,
        snapshotUrl: `https://ipfs.io/ipfs/demo-${hash.slice(0, 12)}`,
        inspector: 'staked-inspector-0x7a (声誉 4.8/5 · 保证金 500 USDC)',
        note: 'MOCK 数据 · Sepolia 测试网演示'
      };
    }
  },

  'escrow.create': {
    description: '创建一笔里程碑托管合约（测试网演示）：买家货款锁定，按验资/验货/质检/交付里程碑凭证据自动放款。',
    inputSchema: {
      type: 'object',
      properties: {
        buyer: { type: 'string', description: '买家名称或地址' },
        amount: { type: 'number', description: '托管总金额（USDC）' },
        milestones: {
          type: 'array',
          items: { type: 'string' },
          description: '里程碑名称列表，如 ["验资","验货","质检","交付"]'
        }
      },
      required: ['buyer', 'amount']
    },
    handler: ({ buyer, amount, milestones }) => {
      // TODO(生产): 调 MilestoneEscrow.deploy(...) 返回真实合约地址
      const salt = sha256hex(`escrow:${buyer}:${amount}:${Date.now()}`).slice(0, 12);
      const n = (milestones && milestones.length) || 4;
      const bps = Array.from({ length: n }, (_, i) =>
        i === n - 1 ? 10000 - Math.floor(10000 / n) * (n - 1) : Math.floor(10000 / n)
      );
      return {
        escrowAddress: `0x${salt}${'0'.repeat(28)}`,
        network: 'Sepolia (testnet)',
        token: 'USDC',
        totalAmount: amount,
        milestoneReleaseBps: bps,
        escrowLink: `https://sepolia.easscan.org/address/0x${salt}`,
        note: `买家 ${buyer} · ${n} 个里程碑 · 证据达标自动放款（MOCK 演示）`
      };
    }
  },

  'compliance.check': {
    description: '出口合规前置筛查：输入目的国与产品，返回通过/拦截及理由（出口管制/制裁模拟）。被拦截本身就是产品能力，留痕上链。',
    inputSchema: {
      type: 'object',
      properties: {
        country: { type: 'string', description: '目的国，如 俄罗斯 / 迪拜 / 美国' },
        product: { type: 'string', description: '产品，如 无人机 / 芯片 / 储能设备' }
      },
      required: ['country', 'product']
    },
    handler: ({ country, product }) => {
      // TODO(生产): 调合规 Oracle（对接出口管制/制裁名单库）
      const RISKY = ['俄罗斯', 'iran', '朝鲜', 'russia', 'north korea'];
      const CTRL = ['无人机', '芯片', 'drone', 'chip', '股权', '加密'];
      const risky = RISKY.some(k => (country || '').toLowerCase().includes(k));
      const ctrl = CTRL.some(k => (product || '').toLowerCase().includes(k));
      if (risky && ctrl) {
        return {
          result: '拦截 BLOCKED',
          reason: `${product} 对 ${country} 存在出口管制风险（双用途物项模拟规则）`,
          action: '本单不予生成托管合约；拦截记录将上链留痕（合规即产品能力）'
        };
      }
      return {
        result: '通过 PASS',
        reason: `${product} 对 ${country} 当前无匹配管制项（模拟规则库 v0.1）`,
        action: '放行，可进入托管与验货流程'
      };
    }
  }
};

// ---------- MCP stdio 实现 ----------

let rl = readline.createInterface({ input: process.stdin, terminal: false });

function send(msg) { process.stdout.write(JSON.stringify(msg) + '\n'); }

rl.on('line', (line) => {
  line = line.trim();
  if (!line) return;
  let req;
  try { req = JSON.parse(line); } catch { return; }
  const { id, method, params } = req;

  if (method === 'initialize') {
    send({
      jsonrpc: '2.0', id,
      result: {
        protocolVersion: (params && params.protocolVersion) || '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'fideight-mcp', version: '0.1.0' }
      }
    });
  } else if (method === 'notifications/initialized') {
    // no response needed
  } else if (method === 'tools/list') {
    send({
      jsonrpc: '2.0', id,
      result: {
        tools: Object.entries(tools).map(([name, t]) => ({
          name, description: t.description, inputSchema: t.inputSchema
        }))
      }
    });
  } else if (method === 'tools/call') {
    const tool = tools[params.name];
    if (!tool) {
      send({ jsonrpc: '2.0', id, error: { code: -32602, message: `Unknown tool: ${params.name}` } });
      return;
    }
    try {
      const data = tool.handler(params.arguments || {});
      send({
        jsonrpc: '2.0', id,
        result: {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
        }
      });
    } catch (e) {
      send({ jsonrpc: '2.0', id, error: { code: -32603, message: e.message } });
    }
  } else if (id !== undefined) {
    send({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } });
  }
});

process.stderr.write('fideight-mcp ready (stdio, mock mode)\n');

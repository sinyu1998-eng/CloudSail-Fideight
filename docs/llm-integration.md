# LLM 接入指南 · DeepSeek Harness + 私有 MCP
# LLM Integration — DeepSeek Harness (dsh) + Fideight Private MCP

> 版本 v1 · 2026-11-04 · 中英双语

---

## 1. 两条接入线 Two integration lines

| 线 | 用途 | 位置 |
|---|---|---|
| **① DeepSeek Harness（dsh）** | 官方开源 Agent 框架（"一切皆插件"），跑本地 Web UI，把 Fideight 三个业务工具作为私有 MCP 挂上去，业务员在界面里直接调度 | 本仓库 `mcp/fideight-mcp.js` |
| **② CloudSail 后端直连 DeepSeek API** | 产品里"语音→结构化→报价"的理解层走 DeepSeek（OpenAI 兼容接口）；**金额与账本路径不走 LLM**，走确定性公式 | 见 §4 |

## 2. 跑通 DeepSeek Harness Run dsh

```bash
# Node.js 18+，一条命令启动 Web UI（默认 http://127.0.0.1:3080）
npx @deepseek-ai/dsh web
# 首次启动按提示登录/填 DeepSeek API Key（platform.deepseek.com 获取）
```

> 该项目处于 developer preview，接口可能快速变化（官方原话）。

## 3. 把 Fideight 私有 MCP 挂进 dsh Register our MCP

本仓库 `mcp/fideight-mcp.js` 是零依赖 Node 版 MCP 服务器（stdio），已实测握手与工具调用通过。提供三个工具：

| 工具 | 输入 | 返回 |
|---|---|---|
| `evidence.verify` | 订单号/SN | 证据哈希、上链时间、抓拍图、验货方（声誉+保证金） |
| `escrow.create` | 买家、金额、里程碑 | 测试网托管合约地址、放款比例、托管链接 |
| `compliance.check` | 目的国、产品 | 通过/拦截 + 理由（拦截记录上链留痕） |

在 dsh 的 MCP 配置中注册：

```json
{
  "mcpServers": {
    "fideight": {
      "command": "node",
      "args": ["/path/to/cloudsail-fideight/mcp/fideight-mcp.js"]
    }
  }
}
```

自测（无需 dsh 也能验证）：

```bash
cd mcp
printf '%s\n%s\n%s\n' \
 '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' \
 '{"jsonrpc":"2.0","method":"notifications/initialized"}' \
 '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"compliance.check","arguments":{"country":"俄罗斯","product":"无人机"}}}' \
 | node fideight-mcp.js
# id=2 应返回 "拦截 BLOCKED"
```

> **MOCK 说明**：当前返回结构一致的演示数据；每个 tool 内 `TODO(生产)` 处替换为真实后端调用（CloudSail `/api/evidence`、MilestoneEscrow 合约、合规 Oracle）即可上生产。

## 4. CloudSail 后端接 DeepSeek API Backend LLM

DeepSeek 提供 OpenAI 兼容接口，业务侧理解层接入示例（Python）：

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],        # platform.deepseek.com 获取
    base_url="https://api.deepseek.com",           # OpenAI 兼容
)

def understand_inquiry(text: str) -> dict:
    """询盘理解层：只做"理解"，不做任何金额计算。"""
    resp = client.chat.completions.create(
        model="deepseek-chat",
        messages=[{
            "role": "system",
            "content": "你是跨境贸易询盘解析器。只输出 JSON："
                       "{product, quantity, destination, concerns[]}。不计算价格。"
        }, {"role": "user", "content": text}],
        response_format={"type": "json_object"},
        temperature=0.1,
    )
    return json.loads(resp.choices[0].message.content)
```

**红线（AI-Native 的克制）**：LLM 只负责"理解与表达"（询盘提取、信任策略文案、多语邮件）；**三档报价、保证金比例、放款里程碑、利润核算全部走确定性公式引擎**——账本不能猜。

## 5. 端到端演示动线 E2E demo flow

```
业务员（微信/飞书）丢入客户杂乱询盘
  → dsh/Agent 调 compliance.check（拦截则终止并留痕）
  → 调 escrow.create 生成托管链接（首付从 50% 降到 10%）
  → 调 evidence.verify 附上历史验货证据背书
  → DeepSeek API 生成买家母语商务邮件，一键回复
```

这就是"业务员的销售动作 = 协议动作"的完整闭环，可直接作为路演/播客 EP06 的素材。

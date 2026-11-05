# CloudSail × Fideight · Render 部署包

这一目录是自包含的：静态站全量副本 + 最小后端 API，可以直接丢到 Render 上线。

## 一键部署（推荐）

点这个链接，Render 会自动识别 `render.yaml` 并创建 Web Service：

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/sinyu1998-eng/CloudSail-Fideight)

或在 Render Dashboard → **New → Blueprint** → 选择 GitHub 仓库 `sinyu1998-eng/CloudSail-Fideight` → **Apply**。
（首次需要授权 Render 访问该 GitHub 仓库）

## 本地运行

```bash
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
# 打开 http://localhost:8000 （默认落到 product.html）
```

## API（公式引擎，确定性，LLM 不碰钱）

| 路径 | 作用 |
|---|---|
| `GET /api/health` | 健康检查 |
| `GET /api/commission?gmv=10000&rate=0.05&refunds=0` | 佣金计算 |
| `GET /api/escrow/preview?amount=1000&weights=0.3,0.4,0.3` | 里程碑放款预览 |
| `GET /api/compliance/check?country=俄罗斯&product=无人机` | 合规预检 |

## 绑自己的域名

Service → Settings → Custom Domains → 添加域名（如 `fideight.com`）→ 在域名 DNS 加一条 CNAME 指向 Render 给出的地址 → HTTPS 证书自动签发。

free 套餐 15 分钟无访问会休眠，正式商用建议升 Starter（常驻）。

## 与 GitHub Pages 的分工

- **GitHub Pages**（sinyu1998-eng.github.io/CloudSail-Fideight/）：开源展示、文档、专栏，纯静态。
- **Render / 自有域名**：对外商用的公司官网 + 后端 API（店铺接入、佣金计算、合规预检）。

两套内容同源，改完记得同步 `render/` 目录里的副本。

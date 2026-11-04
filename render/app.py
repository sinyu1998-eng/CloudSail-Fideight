"""
CloudSail × Fideight · Render 入口
静态站 + 最小后端 API（公式引擎，LLM 不碰钱）。
本地测试：uvicorn app:app --reload
"""
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

app = FastAPI(title="CloudSail × Fideight", version="1.0.0")

# ---------- API：佣金公式引擎（确定性，红线：LLM 不碰钱） ----------
@app.get("/api/health")
def health():
    return {"status": "ok", "service": "cloudsail-fideight", "version": "1.0.0"}

@app.get("/api/commission")
def commission(gmv: float, rate: float = 0.05, refunds: float = 0.0):
    """commission = (GMV − refunds) × rate，与 ru.html 计算器同一公式"""
    c = max(0.0, (gmv - refunds) * rate)
    return {"gmv": gmv, "refunds": refunds, "rate": rate, "commission": round(c, 2)}

@app.get("/api/escrow/preview")
def escrow_preview(amount: float, weights: str = "0.3,0.4,0.3"):
    """里程碑放款预览：release_i = amount × w_i"""
    ws = [float(x) for x in weights.split(",")]
    if abs(sum(ws) - 1.0) > 1e-6:
        return JSONResponse(status_code=400, content={"error": "weights must sum to 1"})
    return {"amount": amount, "releases": [round(amount * w, 2) for w in ws]}

@app.get("/api/compliance/check")
def compliance_check(country: str, product: str):
    """合规预检（与 MCP compliance.check 同一规则包的只读版）"""
    blocked_pairs = [("俄罗斯", "无人机"), ("俄罗斯", "drone"), ("伊朗", "*"), ("朝鲜", "*")]
    hit = any((c == country and (p == "*" or p == product)) for c, p in blocked_pairs)
    return {"country": country, "product": product,
            "decision": "BLOCKED" if hit else "PASS"}

# ---------- 静态站（本目录下的 html/assets） ----------
app.mount("/static", StaticFiles(directory="."), name="static")

@app.get("/")
def index():
    return FileResponse("product.html")

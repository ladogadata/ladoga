from fastapi import FastAPI

app = FastAPI(title="Ladoga")


@app.get("/api/health")
def health():
    return {"status": "ok"}
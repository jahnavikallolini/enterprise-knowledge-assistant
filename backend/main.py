from fastapi import FastAPI

app = FastAPI(
    title="Enterprise Knowledge Assistant"
)


@app.get("/")
def home():
    return {
        "message": "Enterprise Knowledge Assistant API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
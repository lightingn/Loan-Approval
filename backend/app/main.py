from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.config import CORS_ORIGINS, UPLOAD_DIR, ARTIFACTS_DIR
from app.routes import upload, train, predict, model_status
import os

app = FastAPI(
    title="Loan Approval Prediction API",
    version="1.0.0",
    description="ML-powered loan prediction backend",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    os.makedirs(ARTIFACTS_DIR, exist_ok=True)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": "An unexpected error occurred", "details": str(exc)},
    )

@app.get("/")
def root():
    return {
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }

app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(train.router, prefix="/api", tags=["Training"])
app.include_router(predict.router, prefix="/api", tags=["Predict"])
app.include_router(model_status.router, prefix="/api", tags=["Status"])

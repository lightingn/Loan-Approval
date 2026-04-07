from fastapi import APIRouter
from app.config import MODEL_PATH, PREPROCESSOR_PATH, ARTIFACTS_DIR
from app.models.schemas import ModelStatusResponse
import os
import json

router = APIRouter()

@router.get("/model-status", response_model=ModelStatusResponse)
def get_model_status():
    if os.path.exists(MODEL_PATH) and os.path.exists(PREPROCESSOR_PATH):
        try:
            with open(f"{ARTIFACTS_DIR}/metadata.json", "r") as f:
                meta = json.load(f)
            return ModelStatusResponse(
                trained=True,
                accuracy=meta.get("accuracy"),
                last_trained=meta.get("trained_at"),
                model_path=MODEL_PATH
            )
        except:
            return ModelStatusResponse(trained=True, accuracy=None, last_trained=None, model_path=MODEL_PATH)
    return ModelStatusResponse(trained=False, accuracy=None, last_trained=None, model_path=None)

from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.models.schemas import TrainingResponse
from app.services.ml_service import train_pipeline, state
import os

router = APIRouter()

def background_train(csv_path: str):
    try:
        train_pipeline(csv_path)
    except Exception as e:
        print(f"Background training failed: {e}")

@router.post("/train-model", response_model=TrainingResponse)
async def train_model(background_tasks: BackgroundTasks):
    csv_path = state.get("last_uploaded_csv")
    if not csv_path or not os.path.exists(csv_path):
        raise HTTPException(status_code=400, detail="No dataset uploaded yet")
    background_tasks.add_task(background_train, csv_path)
    return TrainingResponse(message="Training started in the background")

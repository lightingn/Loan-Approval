import pandas as pd
from app.config import MODEL_PATH, PREPROCESSOR_PATH, ARTIFACTS_DIR
from app.models.schemas import LoanPredictionInput, PredictionResponse, TrainingResponse
from ml.pipeline import MLPipeline
import json
import os
from datetime import datetime
import uuid

state = {
    "last_uploaded_csv": None
}

def train_pipeline(csv_path: str) -> dict:
    pipeline = MLPipeline(MODEL_PATH, PREPROCESSOR_PATH)
    df = pd.read_csv(csv_path)
    X_scaled, y = pipeline.preprocess_train(df)
    metrics = pipeline.train(X_scaled, y)
    pipeline.save()
    
    metadata = {
        **metrics,
        "trained_at": datetime.utcnow().isoformat()
    }
    with open(f"{ARTIFACTS_DIR}/metadata.json", "w") as f:
        json.dump(metadata, f)
        
    return metrics

def predict_single(input_data: LoanPredictionInput) -> PredictionResponse:
    pipeline = MLPipeline(MODEL_PATH, PREPROCESSOR_PATH)
    try:
        pipeline.load()
    except FileNotFoundError:
        raise ValueError("Model not trained yet. Please upload a dataset and train the model first.")
        
    input_dict = input_data.model_dump()
    result = pipeline.predict(input_dict)
    
    top_feature = list(result["feature_importances"].keys())[0] if result["feature_importances"] else ""
    
    if result["prediction"] == "Approved":
        reason = f"Strong profile. {top_feature} contributed positively to the approval decision."
    else:
        reason = f"Insufficient profile. {top_feature} was a primary factor in rejection."
    
    return PredictionResponse(
        prediction=result["prediction"],
        probability=result["probability"],
        feature_importances=result["feature_importances"],
        reason=reason,
        loan_id=str(uuid.uuid4())
    )

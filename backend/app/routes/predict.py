from fastapi import APIRouter, HTTPException
from app.models.schemas import LoanPredictionInput, PredictionResponse
from app.services.ml_service import predict_single

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
def predict_loan(input_data: LoanPredictionInput):
    try:
        response = predict_single(input_data)
        return response
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

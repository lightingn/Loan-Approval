from fastapi import APIRouter, UploadFile, HTTPException
from app.config import UPLOAD_DIR, MAX_FILE_SIZE_MB
from app.models.schemas import UploadResponse
import pandas as pd
import os
from datetime import datetime
from app.services.ml_service import state
import json

router = APIRouter()

REQUIRED_COLUMNS = ["Gender", "Married", "Dependents", "Education", "Self_Employed", 
                    "ApplicantIncome", "CoapplicantIncome", "LoanAmount", 
                    "Loan_Amount_Term", "Credit_History", "Property_Area", "Loan_Status"]

@router.post("/upload-dataset", response_model=UploadResponse)
async def upload_dataset(file: UploadFile):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only .csv files are allowed.")
    
    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=413, detail=f"File exceeds max size of {MAX_FILE_SIZE_MB}MB")
        
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filepath = os.path.join(UPLOAD_DIR, f"{timestamp}_{file.filename}")
    
    with open(filepath, "wb") as f:
        f.write(file_bytes)
        
    try:
        df = pd.read_csv(filepath)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid CSV format: {str(e)}")
        
    missing_cols = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing_cols:
        raise HTTPException(status_code=422, detail=f"Missing required columns: {', '.join(missing_cols)}")
        
    state["last_uploaded_csv"] = filepath
    
    missing_dict = df.isnull().sum().to_dict()
    preview = df.head(5).fillna("").to_dict(orient="records")
    
    return UploadResponse(
        filename=file.filename,
        rows=len(df),
        columns=df.columns.tolist(),
        message="Dataset uploaded successfully!",
        missing_values=missing_dict,
        preview_data=preview
    )

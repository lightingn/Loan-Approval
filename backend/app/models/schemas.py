from pydantic import BaseModel, field_validator

class LoanPredictionInput(BaseModel):
    Gender: str
    Married: str
    Dependents: str
    Education: str
    Self_Employed: str
    ApplicantIncome: float
    CoapplicantIncome: float = 0.0
    LoanAmount: float
    Loan_Amount_Term: float
    Credit_History: float
    Property_Area: str

    @field_validator("ApplicantIncome")
    def validate_income(cls, v):
        if v <= 0:
            raise ValueError("Income must be > 0")
        return v

    @field_validator("LoanAmount")
    def validate_loan_amount(cls, v):
        if v <= 0:
            raise ValueError("LoanAmount must be > 0")
        return v

    @field_validator("Credit_History")
    def validate_credit_history(cls, v):
        if v not in [0.0, 1.0]:
            raise ValueError("Credit_History must be 0.0 or 1.0")
        return v

    @field_validator("Gender")
    def validate_gender(cls, v):
        if v not in ["Male", "Female", "Other"]:
            raise ValueError("Gender must be Male, Female, or Other")
        return v

    @field_validator("Property_Area")
    def validate_property_area(cls, v):
        if v not in ["Urban", "Semiurban", "Rural"]:
            raise ValueError("Property_Area must be Urban, Semiurban, or Rural")
        return v

class PredictionResponse(BaseModel):
    prediction: str
    probability: float
    feature_importances: dict
    reason: str
    loan_id: str

class TrainingResponse(BaseModel):
    message: str
    accuracy: float = 0.0
    cv_score: float = 0.0
    cv_std: float = 0.0
    feature_names: list[str] = []
    training_samples: int = 0
    test_samples: int = 0

class UploadResponse(BaseModel):
    filename: str
    rows: int
    columns: list[str]
    message: str
    missing_values: dict
    preview_data: list[dict]

class ModelStatusResponse(BaseModel):
    trained: bool
    accuracy: float | None = None
    last_trained: str | None = None
    model_path: str | None = None

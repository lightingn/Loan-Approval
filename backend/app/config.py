import os
from dotenv import load_dotenv

load_dotenv()

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")
ARTIFACTS_DIR = os.getenv("ARTIFACTS_DIR", "./models")

MODEL_PATH = f"{ARTIFACTS_DIR}/model.pkl"
SCALER_PATH = f"{ARTIFACTS_DIR}/scaler.pkl"
ENCODERS_PATH = f"{ARTIFACTS_DIR}/label_encoders.pkl"
PREPROCESSOR_PATH = f"{ARTIFACTS_DIR}/preprocessor.pkl"

MAX_FILE_SIZE_MB = 50
ALLOWED_EXTENSIONS = [".csv"]
CORS_ORIGINS = ["http://localhost:5173", "http://localhost:3000"]
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))

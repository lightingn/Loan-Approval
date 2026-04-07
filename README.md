# 🏦 Loan Approval Prediction Web App

A complete Full-Stack ML-powered application that seamlessly integrates a FastAPI Python backend with a Vite React frontend to predict loan approvals. The core engine is driven by a custom-trained **Random Forest Classifier** leveraging demographic and financial data to ensure fast, fair, and highly transparent predictions.

---

## 🌟 Key Features
- **Exploratory Data Input**: Support for single loan application forms or continuous batch predictions.
- **Explainable AI (XAI)**: Visualizes feature importance graphs explaining exactly which data points supported or detracted from the ML decision.
- **Asynchronous Flow**: Uses FastAPI `BackgroundTasks` for non-blocking model training and status polling via React Hooks.
- **Modern UI/UX**: Built with Tailwind CSS, Recharts for analytics, and Framer Motion for sleek micro-animations.

---

## 🧠 Machine Learning Model Functioning

The underlying model is a carefully tuned `RandomForestClassifier` from `scikit-learn` hosted within a unified ML pipeline (`ml/pipeline.py`).

### 1. Data Preprocessing
- Drops irrelevant identifiers (e.g., `Loan_ID`).
- Performs **Missing Value Imputation**: Continuous parameters use the median, categorical ones use the mode.
- Uses `LabelEncoder` for categoricals (e.g., Property Area, Education) and maps target `Loan_Status` to binary output.
- Employs a `StandardScaler` ensuring models remain sensitive only to true variance.
- Retains unseen category fallbacks for robust inference.

### 2. Model Training
- The dataset is intelligently partitioned with `train_test_split` (stratified by response variable).
- Hyperparameters tuned globally for balanced output (addressing typical credit dataset biases):
  ```python
  RandomForestClassifier(
      n_estimators=200, max_depth=10, min_samples_split=5,
      min_samples_leaf=2, max_features="sqrt", class_weight="balanced"
  )
  ```
- Continuously cross-validated using 5-fold folds guaranteeing metric integrity.

### 3. Inference & Feature Analytics
- For every prediction route request, the application reconstructs the saved arrays and encoders to format the input.
- Computes `predict-proba()` translating to an Approval Confidence meter percentage in the frontend UI.
- Extracts `model.feature_importances_`, mapping them back to the semantic column titles to offer instant justification.

---

## 📊 Training Data

The model is optimized using the historical `train_ctrUa4K.csv` Loan Data profile provided internally (Sample subset integrated in `/backend/sample_data`). It primarily processes the following column descriptors:

* `Gender`, `Married`, `Dependents`, `Education`, `Self_Employed`
* `ApplicantIncome`, `CoapplicantIncome`
* `LoanAmount`, `Loan_Amount_Term`
* `Credit_History`, `Property_Area`
* `Loan_Status` (Target: Y/N)

---

## 🚀 Setup & Deployment Instructions

### 1. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac / Linux
source venv/bin/activate 

pip install -r requirements.txt
python run.py
```
> API runs on `http://localhost:8000`. Access interactive API documentation at `http://localhost:8000/docs`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
> The frontend application is instantly accessible at `http://localhost:5173`.

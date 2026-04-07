import pandas as pd
import numpy as np
import joblib
import os
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

class MLPipeline:
    def __init__(self, model_path, preprocessor_path):
        self.model_path = model_path
        self.preprocessor_path = preprocessor_path
        self.model = RandomForestClassifier(
            n_estimators=200, max_depth=10, min_samples_split=5,
            min_samples_leaf=2, max_features="sqrt",
            class_weight="balanced", random_state=42, n_jobs=-1
        )
        self.scaler = StandardScaler()
        self.encoders = {}
        self.feature_names = []

    def preprocess_train(self, df):
        if "Loan_ID" in df.columns:
            df = df.drop(columns=["Loan_ID"])
        df = df.dropna(subset=["Loan_Status"])

        num_cols = ["ApplicantIncome", "CoapplicantIncome", "LoanAmount", "Loan_Amount_Term", "Credit_History"]
        cat_cols = ["Gender", "Married", "Dependents", "Education", "Self_Employed", "Property_Area"]

        for col in num_cols:
            if col in df.columns:
                df[col] = df[col].fillna(df[col].median())
        for col in cat_cols:
            if col in df.columns:
                df[col] = df[col].fillna(df[col].mode()[0])

        y = df["Loan_Status"].map({"Y": 1, "N": 0}).values
        
        self.encoders = {}
        for col in cat_cols:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            self.encoders[col] = le

        self.feature_names = ["Gender", "Married", "Dependents", "Education", "Self_Employed", "ApplicantIncome", 
                              "CoapplicantIncome", "LoanAmount", "Loan_Amount_Term", "Credit_History", "Property_Area"]
        X = df[self.feature_names].values
        X_scaled = self.scaler.fit_transform(X)
        return X_scaled, y

    def train(self, X_scaled, y):
        X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42, stratify=y)
        self.model.fit(X_train, y_train)
        accuracy = self.model.score(X_test, y_test)
        cv_scores = cross_val_score(self.model, X_scaled, y, cv=5, scoring="accuracy")
        
        y_pred = self.model.predict(X_test)
        report = classification_report(y_test, y_pred, output_dict=True)

        return {
            "accuracy": float(accuracy),
            "cv_score": float(cv_scores.mean()),
            "cv_std": float(cv_scores.std()),
            "feature_names": self.feature_names,
            "training_samples": len(X_train),
            "test_samples": len(X_test)
        }

    def save(self):
        joblib.dump(self.model, self.model_path)
        joblib.dump({
            "scaler": self.scaler,
            "encoders": self.encoders,
            "feature_names": self.feature_names
        }, self.preprocessor_path)

    def load(self):
        if not os.path.exists(self.model_path) or not os.path.exists(self.preprocessor_path):
            raise FileNotFoundError("Model or preprocessor not found")
        self.model = joblib.load(self.model_path)
        prep = joblib.load(self.preprocessor_path)
        self.scaler = prep["scaler"]
        self.encoders = prep["encoders"]
        self.feature_names = prep["feature_names"]

    def preprocess_single(self, input_dict):
        df = pd.DataFrame([input_dict])
        for col, le in self.encoders.items():
            try:
                df[col] = df[col].astype(str).map(lambda s: s if s in le.classes_ else le.classes_[0])
                df[col] = le.transform(df[col])
            except Exception:
                df[col] = 0
            
        X = df[self.feature_names].values
        X_scaled = self.scaler.transform(X)
        return X_scaled

    def predict(self, input_dict):
        X_scaled = self.preprocess_single(input_dict)
        pred = self.model.predict(X_scaled)[0]
        prob = self.model.predict_proba(X_scaled)[0]
        importances = self.model.feature_importances_
        feature_importance_dict = dict(zip(self.feature_names, importances))
        
        sorted_fi = {k: float(v) for k, v in sorted(feature_importance_dict.items(), key=lambda item: item[1], reverse=True)[:5]}
        
        return {
            "prediction": "Approved" if pred == 1 else "Rejected",
            "probability": float(prob[1]),
            "feature_importances": sorted_fi
        }

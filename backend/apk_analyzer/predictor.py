import os
import json
import joblib
import numpy as np
import pandas as pd

from apk_analyzer.feature_extractor import FeatureExtractor


class MalwarePredictor:

    # Configuration for easy model switching
    MODEL_NAME = "drebin_xgboost_optuna.pkl"
    MODEL_DESC = "XGBoost + Optuna"
    MODEL_VERSION = "v2"
    MODEL_ACCURACY = "98.21%"
    MODEL_PRECISION = "98.66%"
    MODEL_RECALL = "99.01%"
    MODEL_F1 = "98.83%"

    def __init__(self):
        # Determine the project root dynamically
        # __file__ is backend/apk_analyzer/predictor.py
        current_dir = os.path.dirname(os.path.abspath(__file__))
        backend_dir = os.path.dirname(current_dir)
        models_dir = os.path.join(backend_dir, "models")

        model_path = os.path.join(models_dir, self.MODEL_NAME)
        scaler_path = os.path.join(models_dir, "drebin_scaler.pkl")
        features_path = os.path.join(models_dir, "drebin_features.json")

        print("========================================")
        print("Loading AI Model...")
        print(f"Model: {self.MODEL_DESC}")
        print(f"Version: {self.MODEL_VERSION}")
        print(f"Accuracy: {self.MODEL_ACCURACY}")
        print("========================================")

        try:
            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)

            with open(features_path, "r") as f:
                self.feature_names = json.load(f)
        except FileNotFoundError as e:
            print(f"Error: Missing model file. Please ensure models are located in {models_dir}")
            print(f"Details: {e}")
            raise

    def predict(self, apk_parser, dex_parser):

        extractor = FeatureExtractor(apk_parser, dex_parser)

        feature_vector = extractor.generate_vector()

        # Convert to pandas DataFrame to prevent scaler warnings about missing feature names
        feature_df = pd.DataFrame([feature_vector], columns=self.feature_names)

        feature_scaled = self.scaler.transform(feature_df)

        prediction = self.model.predict(feature_scaled)[0]

        probability = self.model.predict_proba(feature_scaled)[0]
        
        # Get the actual probability for the malware class (1)
        # model.classes_ is typically [0, 1]
        try:
            malware_class_index = list(self.model.classes_).index(1)
            malware_probability = float(probability[malware_class_index])
        except ValueError:
            # Fallback if classes_ is not standard
            malware_probability = float(probability[1] if len(probability) > 1 else probability[0])

        classification_confidence = float(np.max(probability) * 100)

        if prediction == 1:
            label = "Malware"
        else:
            label = "Benign"

        return {
            "prediction": label,
            "classification_confidence": round(classification_confidence, 2),
            "malware_probability": round(malware_probability, 4),
            "model_name": "Optuna-Optimized XGBoost",
            "model_version": self.MODEL_VERSION,
            "accuracy": self.MODEL_ACCURACY,
            "precision": self.MODEL_PRECISION,
            "recall": self.MODEL_RECALL,
            "f1": self.MODEL_F1
        }
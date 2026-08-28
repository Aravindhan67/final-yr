import joblib
import pandas as pd
import numpy as np
import logging
from config import Config

logger = logging.getLogger(__name__)

class MalwarePredictor:
    """Handles loading ML models and making predictions."""
    
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MalwarePredictor, cls).__new__(cls)
            cls._instance.model = None
            cls._instance.scaler = None
            cls._instance.label_encoder = None
            cls._instance.is_loaded = False
        return cls._instance

    def load_models(self) -> bool:
        """Load the XGBoost model, scaler, and label encoder."""
        try:
            logger.info("Loading ML models...")
            self.model = joblib.load(Config.XGBOOST_MODEL_PATH)
            self.scaler = joblib.load(Config.SCALER_PATH)
            self.label_encoder = joblib.load(Config.LABEL_ENCODER_PATH)
            self.is_loaded = True
            logger.info("ML models loaded successfully.")
            return True
        except Exception as e:
            logger.error(f"Failed to load models: {str(e)}")
            self.is_loaded = False
            return False

    def predict_single(self, features: list) -> dict:
        """Predict for a single instance."""
        if not self.is_loaded:
            raise ValueError("Models are not loaded.")
            
        if len(features) != 470:
            raise ValueError(f"Expected 470 features, but got {len(features)}")
            
        # Convert to numpy array and reshape for single prediction
        feature_array = np.array(features).reshape(1, -1)
        
        # Scale features
        scaled_features = self.scaler.transform(feature_array)
        
        # Predict class and probabilities
        pred_idx = self.model.predict(scaled_features)[0]
        probabilities = self.model.predict_proba(scaled_features)[0]
        confidence = float(np.max(probabilities) * 100)
        
        # Decode prediction
        prediction = self.label_encoder.inverse_transform([pred_idx])[0]
        
        # Determine risk level based on confidence or predicted class
        # (Assuming 'Benign' means Low risk, everything else is High risk)
        prediction_str = str(prediction)
        risk = "Low" if prediction_str.lower() == "benign" else "High"
        
        return {
            "status": "success",
            "prediction": prediction_str,
            "confidence": round(confidence, 2),
            "risk": risk
        }

    def predict_batch(self, df: pd.DataFrame) -> list:
        """Predict for a batch of instances (pandas DataFrame)."""
        if not self.is_loaded:
            raise ValueError("Models are not loaded.")
            
        if df.shape[1] != 470:
            raise ValueError(f"Expected 470 features in CSV, but got {df.shape[1]}")
            
        # Scale features
        scaled_features = self.scaler.transform(df)
        
        # Predict class and probabilities
        pred_indices = self.model.predict(scaled_features)
        probabilities = self.model.predict_proba(scaled_features)
        
        predictions = self.label_encoder.inverse_transform(pred_indices)
        
        results = []
        for i in range(len(predictions)):
            conf = float(np.max(probabilities[i]) * 100)
            pred_str = str(predictions[i])
            risk = "Low" if pred_str.lower() == "benign" else "High"
            results.append({
                "row_index": i,
                "prediction": pred_str,
                "confidence": round(conf, 2),
                "risk": risk
            })
            
        return results

# Singleton instance
predictor = MalwarePredictor()

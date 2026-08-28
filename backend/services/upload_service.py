import logging
import pandas as pd
import numpy as np
from predict import predictor
from utils.file_validator import validate_csv_file
from utils.report_generator import generate_report_filename, save_report

logger = logging.getLogger(__name__)

def determine_risk(confidence: float) -> str:
    """Determine risk level based on confidence score."""
    if confidence >= 95.0:
        return "High"
    elif confidence >= 80.0:
        return "Medium"
    else:
        return "Low"

def process_upload(file) -> tuple[dict, int]:
    """Processes the uploaded CSV and generates a prediction report."""
    is_valid, msg, df = validate_csv_file(file)
    
    if not is_valid:
        logger.warning(f"File validation failed: {msg}")
        return {"status": "error", "message": msg}, 400
        
    try:
        # Scale features
        scaled_features = predictor.scaler.transform(df.values)
        
        # Predict class and probabilities
        pred_indices = predictor.model.predict(scaled_features)
        probabilities = predictor.model.predict_proba(scaled_features)
        
        # Decode labels
        predictions_labels = predictor.label_encoder.inverse_transform(pred_indices)
        
        # Calculate confidences and risks
        confidences = []
        risks = []
        for i in range(len(predictions_labels)):
            conf = float(np.max(probabilities[i]) * 100)
            conf = round(conf, 2)
            confidences.append(conf)
            risks.append(determine_risk(conf))
            
        # Generate report
        report_filename = generate_report_filename()
        save_report(df, [str(p) for p in predictions_labels], confidences, risks, report_filename)
        
        rows_processed = len(df)
        
        logger.info(f"Processed {rows_processed} rows. Report generated: {report_filename}")
        
        return {
            "status": "success",
            "rows_processed": rows_processed,
            "report_file": report_filename,
            "download_url": f"/download-report/{report_filename}"
        }, 200
        
    except Exception as e:
        logger.error(f"Prediction failure during upload: {str(e)}")
        return {"status": "error", "message": "Prediction failure. Internal server error."}, 500

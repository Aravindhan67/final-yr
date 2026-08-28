import os
import pandas as pd
import logging
from predict import predictor
from config import Config

logger = logging.getLogger(__name__)

def make_prediction(features: list) -> dict:
    """Service to handle single prediction request."""
    return predictor.predict_single(features)

def process_csv_upload(filepath: str) -> dict:
    """Service to process uploaded CSV for batch predictions."""
    try:
        # Read CSV
        df = pd.read_csv(filepath)
        
        # Basic validation
        if df.shape[1] != 470:
            return {
                "error": f"Invalid feature count. Expected 470, found {df.shape[1]}.",
                "success": False
            }
            
        # Make batch predictions
        results = predictor.predict_batch(df)
        
        # Save report
        report_filename = os.path.basename(filepath).replace(".csv", "_report.csv")
        report_path = os.path.join(Config.REPORTS_DIR, report_filename)
        
        report_df = df.copy()
        report_df['Prediction'] = [res['prediction'] for res in results]
        report_df['Confidence'] = [res['confidence'] for res in results]
        report_df['Risk'] = [res['risk'] for res in results]
        report_df.to_csv(report_path, index=False)
        
        return {
            "success": True,
            "total_processed": len(results),
            "results": results,
            "report_filename": report_filename
        }
        
    except Exception as e:
        logger.error(f"Error processing CSV: {str(e)}")
        return {
            "error": "Failed to process CSV file.",
            "success": False
        }

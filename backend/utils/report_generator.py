import os
import pandas as pd
from datetime import datetime
from config import Config

def generate_report_filename() -> str:
    """Generates a timestamped report filename."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"prediction_report_{timestamp}.csv"

def save_report(df: pd.DataFrame, predictions: list, confidences: list, risks: list, filename: str) -> str:
    """Appends prediction columns to the dataframe and saves it to reports directory."""
    report_df = df.copy()
    report_df['Prediction'] = predictions
    report_df['Confidence'] = confidences
    report_df['Risk'] = risks
    
    report_path = os.path.join(Config.REPORTS_DIR, filename)
    report_df.to_csv(report_path, index=False)
    
    return report_path

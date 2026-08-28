import os
import pandas as pd
from werkzeug.utils import secure_filename
from config import Config

def validate_csv_file(file) -> tuple[bool, str, pd.DataFrame | None]:
    """
    Validates the uploaded file.
    Checks existence, extension, MIME type, empty file, missing values, and column count.
    """
    if not file or file.filename == '':
        return False, "No file uploaded.", None
        
    filename = secure_filename(file.filename)
    ext = filename.rsplit('.', 1)[-1].lower()
    
    if ext != 'csv':
        return False, "Invalid file extension. Only .csv allowed.", None
        
    try:
        df = pd.read_csv(file)
    except Exception as e:
        return False, f"Corrupted CSV file: {str(e)}", None
        
    if df.empty:
        return False, "CSV file is empty.", None
        
    if df.isnull().values.any():
        return False, "CSV contains missing values.", None
        
    if df.shape[1] != 470:
        return False, f"Incorrect feature count. Expected 470, got {df.shape[1]}.", None
        
    return True, "Valid", df

import os

class Config:
    """Base configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default-secret-key-for-dev')
    
    # Path configuration
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    MODELS_DIR = os.path.join(BASE_DIR, 'models')
    UPLOADS_DIR = os.path.join(BASE_DIR, 'uploads')
    REPORTS_DIR = os.path.join(BASE_DIR, 'reports')
    LOGS_DIR = os.path.join(BASE_DIR, 'logs')
    
    # ML model files
    XGBOOST_MODEL_PATH = os.path.join(MODELS_DIR, 'xgboost_model.pkl')
    SCALER_PATH = os.path.join(MODELS_DIR, 'scaler.pkl')
    LABEL_ENCODER_PATH = os.path.join(MODELS_DIR, 'label_encoder.pkl')
    
    # File upload settings
    MAX_CONTENT_LENGTH = 20 * 1024 * 1024  # 20 MB max limit
    ALLOWED_EXTENSIONS = {'csv'}

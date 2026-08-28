import os
from werkzeug.utils import secure_filename
from config import Config

def allowed_file(filename: str) -> bool:
    """Check if a file has an allowed extension."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

def get_file_path(directory: str, filename: str) -> str:
    """Get secure file path for saving."""
    filename = secure_filename(filename)
    return os.path.join(directory, filename)

def ensure_directories_exist():
    """Ensure required directories exist before starting."""
    for directory in [Config.UPLOADS_DIR, Config.REPORTS_DIR, Config.LOGS_DIR, Config.MODELS_DIR]:
        os.makedirs(directory, exist_ok=True)

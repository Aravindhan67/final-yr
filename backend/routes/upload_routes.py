import os
import logging
from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
from services.upload_service import process_upload
from config import Config

logger = logging.getLogger(__name__)
upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload_csv():
    """Endpoint for uploading CSV files."""
    try:
        if 'file' not in request.files:
            return jsonify({"status": "error", "message": "No file uploaded"}), 400
            
        file = request.files['file']
        
        result, status_code = process_upload(file)
        return jsonify(result), status_code
        
    except Exception as e:
        logger.error(f"Internal server error during upload: {str(e)}")
        return jsonify({"status": "error", "message": "Internal server error"}), 500

@upload_bp.route('/download-report/<filename>', methods=['GET'])
def download_report(filename):
    """Endpoint to download generated report."""
    try:
        # Secure the filename to prevent path traversal
        filename = secure_filename(filename)
        report_path = os.path.join(Config.REPORTS_DIR, filename)
        
        if os.path.exists(report_path):
            return send_file(report_path, as_attachment=True, mimetype='text/csv')
        else:
            return jsonify({"status": "error", "message": "Report not found."}), 404
            
    except Exception as e:
        logger.error(f"Error downloading report: {str(e)}")
        return jsonify({"status": "error", "message": "Internal server error"}), 500

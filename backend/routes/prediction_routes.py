import os
import logging
from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
from services import prediction_service
from predict import predictor
from config import Config

logger = logging.getLogger(__name__)
prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/', methods=['GET'])
def index():
    """Root endpoint to check API status."""
    return jsonify({
        "message": "AI Android Malware Detection API",
        "status": "running"
    }), 200

@prediction_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "model_loaded": predictor.is_loaded,
        "version": "1.0"
    }), 200

@prediction_bp.route('/predict', methods=['POST'])
def predict():
    """Endpoint for a single prediction."""
    try:
        data = request.get_json()
        
        if not data or 'features' not in data:
            return jsonify({"error": "Invalid JSON. 'features' key is required."}), 400
            
        features = data['features']
        
        if not isinstance(features, list) or len(features) != 470:
            return jsonify({"error": "Wrong feature count. Expected exactly 470 numerical features."}), 400
            
        # Log request IP
        ip_address = request.remote_addr
        
        # Get prediction
        result = prediction_service.make_prediction(features)
        
        logger.info(f"Prediction made for IP: {ip_address} - Result: {result['prediction']}")
        
        return jsonify(result), 200
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.error(f"Internal server error during prediction: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500



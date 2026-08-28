import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

from services.hybrid_detection_engine import HybridDetectionEngine
from apk_analyzer.apk_parser import APKParser
from apk_analyzer.dex_parser import DEXParser

apk_bp = Blueprint("apk", __name__)

UPLOAD_FOLDER = "backend/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

detection_engine = HybridDetectionEngine()

@apk_bp.route("/upload-apk", methods=["POST"])
def upload_apk():

    print("1. Request received", flush=True)

    if "file" not in request.files:
        print("No file", flush=True)
        return jsonify({"status": "error"})

    file = request.files["file"]
    print("2. File object created", flush=True)

    filename = secure_filename(file.filename)
    print("3. Filename:", filename, flush=True)

    apk_path = os.path.join(UPLOAD_FOLDER, filename)

    file.save(apk_path)
    print("4. File saved", flush=True)

    print("5. APKParser started", flush=True)
    parser = APKParser(apk_path)
    print("6. APKParser finished", flush=True)

    info = parser.get_basic_info()
    print("7. Basic info extracted", flush=True)
    
    print("8. DEXParser started", flush=True)
    dex_parser = DEXParser(parser.apk)
    print("9. DEXParser finished", flush=True)

    print("10. Detection Engine started", flush=True)
    try:
        detection_result = detection_engine.evaluate(parser, dex_parser, apk_path=apk_path)
    except Exception as e:
        print(f"Error during detection: {e}", flush=True)
        return jsonify({"status": "error", "message": "Failed to analyze APK."}), 500
    print("11. Detection Engine finished", flush=True)

    return jsonify({
        "status": "success",
        "app_info": {
            "app_name": info.get("App Name", "Unknown"),
            "package_name": info.get("Package Name", "Unknown"),
            "version_name": info.get("Version Name", "Unknown"),
            "target_sdk": info.get("Target SDK", "Unknown")
        },
        "ml_analysis": detection_result["ml_analysis"],
        "anomaly_analysis": detection_result["anomaly_analysis"],
        "signature_analysis": detection_result["signature_analysis"],
        "dynamic_analysis": detection_result.get("dynamic_analysis", {}),
        "final_analysis": detection_result["final_analysis"]
    })
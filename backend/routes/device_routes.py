from flask import Blueprint, jsonify, request
from device_monitor.app_inventory import get_mock_inventory
from device_monitor.risk_analyzer import RiskAnalyzer
from device_monitor.alert_manager import AlertManager

device_bp = Blueprint("device", __name__, url_prefix="/api/device")

risk_analyzer = RiskAnalyzer()
alert_manager = AlertManager()

@device_bp.route("/apps", methods=["GET"])
def get_apps():
    """Returns the raw inventory of installed apps."""
    return jsonify({
        "status": "success",
        "apps": get_mock_inventory()
    })

@device_bp.route("/scan", methods=["POST"])
def scan_device():
    """Scans the device inventory for security risks."""
    inventory = get_mock_inventory()
    
    analyzed_apps = []
    safe_apps = 0
    low_risk = 0
    medium_risk = 0
    high_risk = 0
    critical_risk = 0
    
    for app in inventory:
        result = risk_analyzer.analyze_app(app)
        analyzed_apps.append(result)
        
        if result["risk_level"] == "Safe":
            safe_apps += 1
        elif result["risk_level"] == "Low Risk":
            low_risk += 1
        elif result["risk_level"] == "Medium Risk":
            medium_risk += 1
        elif result["risk_level"] == "High Risk":
            high_risk += 1
        else:
            critical_risk += 1
            
    alerts = alert_manager.generate_alerts(analyzed_apps)
            
    return jsonify({
        "status": "success",
        "mode": "device_monitor",
        "total_apps_scanned": len(inventory),
        "safe_apps": safe_apps,
        "low_risk_apps": low_risk,
        "medium_risk_apps": medium_risk,
        "high_risk_apps": high_risk,
        "critical_risk_apps": critical_risk,
        "apps": analyzed_apps,
        "alerts": alerts
    })

@device_bp.route("/alerts", methods=["GET"])
def get_alerts():
    """Quickly retrieve current alerts."""
    inventory = get_mock_inventory()
    analyzed_apps = [risk_analyzer.analyze_app(app) for app in inventory]
    alerts = alert_manager.generate_alerts(analyzed_apps)
    
    return jsonify({
        "status": "success",
        "alerts": alerts
    })

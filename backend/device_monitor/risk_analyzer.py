from device_monitor.permission_analyzer import PermissionAnalyzer

class RiskAnalyzer:
    def __init__(self):
        self.permission_analyzer = PermissionAnalyzer()
        
    def analyze_app(self, app_data):
        permissions = app_data.get("permissions", [])
        perm_analysis = self.permission_analyzer.analyze_permissions(permissions)
        
        static_risk_score = min(len(perm_analysis["sensitive_permissions"]) * 5, 40)
        signature_score = min(len(perm_analysis["suspicious_combinations"]) * 20, 60)
        
        # Mock anomaly score for device monitor apps
        anomaly_score = 0
        if "flashlight" in app_data["package_name"].lower() and len(permissions) > 3:
            anomaly_score = 50
        elif "battery" in app_data["package_name"].lower() and "SYSTEM_ALERT_WINDOW" in permissions:
            anomaly_score = 70
            
        overall_risk_score = (static_risk_score * 0.4) + (anomaly_score * 0.3) + (signature_score * 0.3)
        overall_risk_score = min(round(overall_risk_score, 2), 100)
        
        if overall_risk_score <= 20:
            risk_level = "Safe"
            verdict = "No significant threat detected"
        elif overall_risk_score <= 40:
            risk_level = "Low Risk"
            verdict = "Minor suspicious traits"
        elif overall_risk_score <= 60:
            risk_level = "Medium Risk"
            verdict = "Suspicious application"
        elif overall_risk_score <= 80:
            risk_level = "High Risk"
            verdict = "High probability of malicious intent"
        else:
            risk_level = "Critical Risk"
            verdict = "Critical threat detected"
            
        return {
            "app_name": app_data["app_name"],
            "package_name": app_data["package_name"],
            "version": app_data.get("version", "Unknown"),
            "permissions": permissions,
            "sensitive_permissions": perm_analysis["sensitive_permissions"],
            "suspicious_permission_combinations": perm_analysis["suspicious_combinations"],
            "static_risk_score": static_risk_score,
            "anomaly_score": anomaly_score,
            "signature_score": signature_score,
            "overall_risk_score": overall_risk_score,
            "risk_level": risk_level,
            "verdict": verdict
        }

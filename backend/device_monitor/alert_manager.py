class AlertManager:
    def generate_alerts(self, analyzed_apps):
        alerts = []
        for app in analyzed_apps:
            if app["risk_level"] in ["High Risk", "Critical Risk"]:
                alerts.append({
                    "app_name": app["app_name"],
                    "package_name": app["package_name"],
                    "risk_level": app["risk_level"],
                    "verdict": app["verdict"],
                    "timestamp": "Just now",
                    "reason": f"Overall Threat Score of {app['overall_risk_score']} exceeded safety thresholds."
                })
        return alerts

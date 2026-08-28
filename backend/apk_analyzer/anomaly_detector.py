class AnomalyDetector:
    def __init__(self):
        # Baseline expectations (rough thresholds for anomaly)
        self.max_normal_sensitive_permissions = 3
        self.sensitive_permissions = {
            "SEND_SMS", "RECEIVE_SMS", "READ_SMS", "READ_CONTACTS",
            "READ_PHONE_STATE", "RECORD_AUDIO", "ACCESS_FINE_LOCATION",
            "SYSTEM_ALERT_WINDOW", "BIND_DEVICE_ADMIN", "REQUEST_INSTALL_PACKAGES"
        }
        self.abnormal_apis = {
            "Ldalvik/system/DexClassLoader;",
            "Ldalvik/system/PathClassLoader;",
            "Ljava/lang/Runtime;->exec",
            "Landroid/telephony/TelephonyManager;->getDeviceId",
            "Landroid/telephony/SmsManager;->sendTextMessage"
        }

    def evaluate(self, extracted_features):
        anomaly_score = 0
        suspicious_features = []
        
        # Count sensitive permissions
        requested_sensitive_perms = [
            f for f in extracted_features if f in self.sensitive_permissions
        ]
        
        # Anomaly based on excessive sensitive permissions
        if len(requested_sensitive_perms) > self.max_normal_sensitive_permissions:
            extra = len(requested_sensitive_perms) - self.max_normal_sensitive_permissions
            # 10 points for each extra sensitive permission, max 40
            penalty = min(extra * 10, 40)
            anomaly_score += penalty
            suspicious_features.append(f"Excessive sensitive permissions ({len(requested_sensitive_perms)} requested)")
            
        # Anomaly based on abnormal API usage
        used_abnormal_apis = [
            f for f in extracted_features if f in self.abnormal_apis
        ]
        
        if used_abnormal_apis:
            # 15 points for each abnormal API, max 60
            penalty = min(len(used_abnormal_apis) * 15, 60)
            anomaly_score += penalty
            for api in used_abnormal_apis:
                suspicious_features.append(f"Abnormal API usage: {api}")
                
        # Cap score at 100
        anomaly_score = min(anomaly_score, 100)
        
        # Determine risk level
        if anomaly_score <= 20:
            risk_level = "Safe"
        elif anomaly_score <= 40:
            risk_level = "Low"
        elif anomaly_score <= 60:
            risk_level = "Medium"
        elif anomaly_score <= 80:
            risk_level = "High"
        else:
            risk_level = "Critical"
            
        return {
            "anomaly_score": float(anomaly_score),
            "risk_level": risk_level,
            "suspicious_features": suspicious_features
        }

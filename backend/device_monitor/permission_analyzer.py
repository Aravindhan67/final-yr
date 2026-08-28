class PermissionAnalyzer:
    def __init__(self):
        self.sensitive_permissions = [
            "READ_CONTACTS", "WRITE_CONTACTS",
            "READ_SMS", "SEND_SMS", "RECEIVE_SMS",
            "READ_PHONE_STATE", "RECORD_AUDIO",
            "ACCESS_FINE_LOCATION", "CAMERA",
            "SYSTEM_ALERT_WINDOW", "BIND_DEVICE_ADMIN",
            "REQUEST_INSTALL_PACKAGES"
        ]
        
    def analyze_permissions(self, permissions):
        sensitive_found = [p for p in permissions if p in self.sensitive_permissions]
        
        suspicious_combinations = []
        
        # Check combinations
        if "RECEIVE_SMS" in permissions and "INTERNET" in permissions:
            suspicious_combinations.append("Can read SMS and send data over internet (Potential 2FA stealer)")
            
        if "RECORD_AUDIO" in permissions and "INTERNET" in permissions and "SYSTEM_ALERT_WINDOW" in permissions:
            suspicious_combinations.append("Can record audio, overlay screen, and send data (Potential spyware)")
            
        if "BIND_DEVICE_ADMIN" in permissions and "INTERNET" in permissions:
            suspicious_combinations.append("Requests Device Admin and Internet (Potential Ransomware)")

        return {
            "sensitive_permissions": sensitive_found,
            "suspicious_combinations": suspicious_combinations
        }

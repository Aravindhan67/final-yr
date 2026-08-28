import random

class LogcatMonitor:
    def analyze_logs(self, is_malware_predicted=False):
        suspicious_logs = []
        
        if is_malware_predicted:
            if random.random() > 0.3:
                suspicious_logs.append("Warning: Attempt to read SMS inbox")
            if random.random() > 0.4:
                suspicious_logs.append("Error: Failed to bind to hidden service")
            suspicious_logs.append("Info: Base64 encoded payload executed")
        
        return suspicious_logs

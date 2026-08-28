import random

class NetworkMonitor:
    def analyze_traffic(self, is_malware_predicted=False):
        network_summary = {
            "total_connections": random.randint(0, 5),
            "suspicious_connections": 0,
            "destinations": []
        }
        
        if is_malware_predicted and random.random() > 0.2:
            network_summary["total_connections"] = random.randint(2, 10)
            network_summary["suspicious_connections"] = random.randint(1, 3)
            network_summary["destinations"].append("192.168.x.x (Suspicious Local Scan)")
            network_summary["destinations"].append("Unknown IP (TCP port 4444)")
            
        elif random.random() > 0.5:
            network_summary["destinations"].append("Google APIs (Standard)")
            
        return network_summary

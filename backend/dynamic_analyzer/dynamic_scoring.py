class DynamicScorer:
    def calculate_score(self, behavior_data, log_data, network_data):
        score = 0
        indicators = []
        
        # Behavior scoring
        if "Attempted to hide app icon from launcher" in behavior_data["events"]:
            score += 30
            indicators.append("Hidden app icon")
        if "Requested Device Administrator privileges" in behavior_data["events"]:
            score += 40
            indicators.append("Device Admin request")
            
        # Logcat scoring
        if len(log_data) > 0:
            score += len(log_data) * 15
            indicators.extend(log_data)
            
        # Network scoring
        if network_data["suspicious_connections"] > 0:
            score += network_data["suspicious_connections"] * 20
            indicators.append(f"Made {network_data['suspicious_connections']} suspicious network connections")
            
        # Cap score at 100
        final_score = min(score, 100)
        
        if final_score <= 20:
            risk = "Safe"
        elif final_score <= 40:
            risk = "Low Risk"
        elif final_score <= 60:
            risk = "Medium Risk"
        elif final_score <= 80:
            risk = "High Risk"
        else:
            risk = "Critical Risk"
            
        return {
            "dynamic_score": final_score,
            "dynamic_risk_level": risk,
            "runtime_duration": "30s (Simulated)",
            "runtime_events": behavior_data["events"],
            "network_summary": network_data,
            "suspicious_indicators": indicators
        }

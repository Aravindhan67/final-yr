import random

class BehaviorMonitor:
    """
    Monitors process lifecycle and application launch.
    """
    def analyze_behavior(self, apk_path, is_malware_predicted=False):
        # Mocking behavior based on static ML prediction
        
        success = True
        crashes = 0
        events = ["App launched successfully"]

        if is_malware_predicted:
            if random.random() > 0.5:
                events.append("Attempted to hide app icon from launcher")
            if random.random() > 0.4:
                events.append("Requested Device Administrator privileges")
            events.append("Background service started persistently")
        else:
            if random.random() > 0.8:
                events.append("App crashed on startup (NullPointerException)")
                crashes = 1
            else:
                events.append("Normal background service registered")

        return {
            "launch_success": success,
            "crashes": crashes,
            "events": events
        }

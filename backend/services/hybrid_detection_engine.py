from apk_analyzer.feature_extractor import FeatureExtractor
from apk_analyzer.predictor import MalwarePredictor
from apk_analyzer.anomaly_detector import AnomalyDetector
from apk_analyzer.signature_detector import SignatureDetector

# Dynamic Analyzer Modules
from dynamic_analyzer.emulator_manager import EmulatorManager
from dynamic_analyzer.behavior_monitor import BehaviorMonitor
from dynamic_analyzer.logcat_monitor import LogcatMonitor
from dynamic_analyzer.network_monitor import NetworkMonitor
from dynamic_analyzer.dynamic_scoring import DynamicScorer

class HybridDetectionEngine:
    def __init__(self):
        self.predictor = MalwarePredictor()
        self.anomaly_detector = AnomalyDetector()
        self.signature_detector = SignatureDetector()
        
        # Dynamic Analysis Initialization
        self.emulator = EmulatorManager()
        self.behavior_monitor = BehaviorMonitor()
        self.logcat_monitor = LogcatMonitor()
        self.network_monitor = NetworkMonitor()
        self.dynamic_scorer = DynamicScorer()

    def evaluate(self, apk_parser, dex_parser, apk_path=None):
        # Extract features once for anomaly and signature detection
        extractor = FeatureExtractor(apk_parser, dex_parser)
        extracted_features = extractor.collect_features()

        # 1. ML Threat Score (45%)
        ml_result = self.predictor.predict(apk_parser, dex_parser)
        ml_threat_score = ml_result["malware_probability"] * 100
        is_malware_predicted = ml_result["prediction"] == "Malware"

        # 2. Anomaly Score (15%)
        anomaly_result = self.anomaly_detector.evaluate(extracted_features)
        anomaly_score = anomaly_result["anomaly_score"]

        # 3. Signature Score (10%)
        signature_result = self.signature_detector.evaluate(extracted_features)
        signature_score = signature_result["signature_score"]
        
        # 4. Dynamic Behavior Score (30%)
        # In a real setup, we would only do this if it's safe or explicitly requested.
        # Since we use safe mocks for now, we run it every time.
        dynamic_score = 0
        dynamic_result = {}
        
        if self.emulator.start_emulator():
            if self.emulator.install_apk(apk_path):
                behavior_data = self.behavior_monitor.analyze_behavior(apk_path, is_malware_predicted)
                log_data = self.logcat_monitor.analyze_logs(is_malware_predicted)
                network_data = self.network_monitor.analyze_traffic(is_malware_predicted)
                
                dynamic_result = self.dynamic_scorer.calculate_score(behavior_data, log_data, network_data)
                dynamic_score = dynamic_result["dynamic_score"]
                
                self.emulator.uninstall_apk(apk_parser.apk.get_package())
            self.emulator.stop_emulator()

        # 5. Final Detection Score
        overall_threat_score = (ml_threat_score * 0.45) + (anomaly_score * 0.15) + (signature_score * 0.10) + (dynamic_score * 0.30)
        overall_threat_score = round(overall_threat_score, 2)

        # Determine Final Risk Level & Verdict
        if overall_threat_score <= 20:
            final_risk = "Safe"
            final_verdict = "Benign"
        elif overall_threat_score <= 40:
            final_risk = "Low Risk"
            final_verdict = "Suspicious"
        elif overall_threat_score <= 60:
            final_risk = "Medium Risk"
            final_verdict = "Suspicious"
        elif overall_threat_score <= 80:
            final_risk = "High Risk"
            final_verdict = "Malicious"
        else:
            final_risk = "Critical Risk"
            final_verdict = "Malicious"

        # Signature Override Logic
        if signature_score >= 80 and overall_threat_score <= 60:
            final_risk = "High Risk"
            final_verdict = "Malicious"
        
        # Prepare status for signature
        if signature_result["total_matches"] == 0:
            sig_status = "No known malicious signatures detected."
        else:
            sig_status = f"Detected {signature_result['total_matches']} known malicious signatures."

        return {
            "ml_analysis": {
                "prediction": ml_result["prediction"],
                "classification_confidence": ml_result["classification_confidence"],
                "malware_probability": ml_result["malware_probability"],
                "ml_threat_score": round(ml_threat_score, 2),
                "model_name": ml_result["model_name"],
                "accuracy": ml_result["accuracy"],
                "precision": ml_result["precision"],
                "recall": ml_result["recall"],
                "f1": ml_result["f1"]
            },
            "anomaly_analysis": {
                "anomaly_score": anomaly_result["anomaly_score"],
                "risk": anomaly_result["risk_level"],
                "suspicious_features": anomaly_result["suspicious_features"]
            },
            "signature_analysis": {
                "signature_score": signature_result["signature_score"],
                "matches": signature_result["total_matches"],
                "status": sig_status,
                "matched_signatures": signature_result["matched_signatures"]
            },
            "dynamic_analysis": dynamic_result,
            "final_analysis": {
                "overall_threat_score": overall_threat_score,
                "risk_level": final_risk,
                "verdict": final_verdict
            }
        }

from apk_analyzer.feature_extractor import FeatureExtractor
from apk_analyzer.predictor import MalwarePredictor
from apk_analyzer.anomaly_detector import AnomalyDetector
from apk_analyzer.signature_detector import SignatureDetector

class DetectionEngine:
    def __init__(self):
        self.predictor = MalwarePredictor()
        self.anomaly_detector = AnomalyDetector()
        self.signature_detector = SignatureDetector()

    def evaluate(self, apk_parser, dex_parser):
        # Extract features once for anomaly and signature detection
        extractor = FeatureExtractor(apk_parser, dex_parser)
        extracted_features = extractor.collect_features()

        # 1. ML Threat Score (70%)
        ml_result = self.predictor.predict(apk_parser, dex_parser)
        ml_threat_score = ml_result["malware_probability"] * 100

        # 2. Anomaly Score (20%)
        anomaly_result = self.anomaly_detector.evaluate(extracted_features)
        anomaly_score = anomaly_result["anomaly_score"]

        # 3. Signature Score (10%)
        signature_result = self.signature_detector.evaluate(extracted_features)
        signature_score = signature_result["signature_score"]

        # 4. Final Detection Score
        overall_threat_score = (ml_threat_score * 0.70) + (anomaly_score * 0.20) + (signature_score * 0.10)
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
            # Keep overall_threat_score as is, or bump it. We'll just override the verdict.
        
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
            "final_analysis": {
                "overall_threat_score": overall_threat_score,
                "risk_level": final_risk,
                "verdict": final_verdict
            }
        }

import json
import os

class SignatureDetector:
    def __init__(self):
        # Load signatures.json
        current_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(os.path.dirname(current_dir))
        signatures_path = os.path.join(project_root, "models", "signatures.json")
        
        try:
            with open(signatures_path, "r") as f:
                self.signatures = json.load(f)
        except FileNotFoundError:
            print(f"Warning: {signatures_path} not found. Signature detection will be limited.")
            self.signatures = {
                "suspicious_permissions": [],
                "dangerous_combinations": [],
                "suspicious_apis": []
            }

    def evaluate(self, extracted_features):
        signature_score = 0
        matched_signatures = []
        
        # 1. Check Suspicious Permissions
        # Need to strip 'android.permission.' for matching if extracted_features only have the suffix
        # FeatureExtractor returns just the suffix (e.g., "SEND_SMS")
        for perm in self.signatures.get("suspicious_permissions", []):
            perm_suffix = perm.split(".")[-1]
            if perm_suffix in extracted_features:
                signature_score += 5  # 5 points per suspicious permission
                matched_signatures.append(f"Suspicious Permission: {perm_suffix}")

        # 2. Check Dangerous Combinations
        for combo in self.signatures.get("dangerous_combinations", []):
            # Check if all permissions in the combination are present
            combo_suffixes = [p.split(".")[-1] for p in combo]
            if all(p in extracted_features for p in combo_suffixes):
                signature_score += 20  # 20 points for dangerous combinations
                matched_signatures.append(f"Dangerous Combination: {' + '.join(combo_suffixes)}")

        # 3. Check Suspicious APIs
        for api in self.signatures.get("suspicious_apis", []):
            if api in extracted_features:
                signature_score += 15  # 15 points per suspicious API
                matched_signatures.append(f"Suspicious API: {api}")

        # Cap score at 100
        signature_score = min(signature_score, 100)
        
        return {
            "signature_score": float(signature_score),
            "matched_signatures": matched_signatures,
            "total_matches": len(matched_signatures)
        }

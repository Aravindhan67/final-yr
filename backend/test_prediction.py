from apk_analyzer.predictor import MalwarePredictor

APK_PATH = "backend/uploads/F-Droid.apk"

predictor = MalwarePredictor()

result = predictor.predict(APK_PATH)

print("=" * 60)
print("PREDICTION RESULT")
print("=" * 60)

print("Prediction :", result["prediction"])
print("Confidence:", result["confidence"], "%")
print("Risk Level:", result["risk"])
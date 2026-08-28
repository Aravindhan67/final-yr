from apk_analyzer.feature_extractor import FeatureExtractor

APK_PATH = "backend/uploads/F-Droid.apk"

extractor = FeatureExtractor(APK_PATH)

vector = extractor.generate_vector()

print("=" * 60)
print("FEATURE VECTOR")
print("=" * 60)

print("Length :", len(vector))

print("\nFirst 50 Features")

print(vector[:50])

print("\nDetected Features")

print(sum(vector))
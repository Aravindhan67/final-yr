from apk_analyzer.dex_parser import DEXParser

APK_PATH = "backend/uploads/F-Droid.apk"

parser = DEXParser(APK_PATH)

parser.summary()

print("\n")

print("=" * 60)
print("FIRST 20 METHODS")
print("=" * 60)

for method in parser.get_methods()[:20]:
    print(method)

print("\n")

print("=" * 60)
print("FIRST 20 EXTERNAL APIs")
print("=" * 60)

for api in parser.get_external_methods()[:20]:
    print(api)

print("\n")

print("=" * 60)
print("FIRST 20 STRINGS")
print("=" * 60)

for s in parser.get_strings()[:20]:
    print(s)
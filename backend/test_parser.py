import os
from apk_analyzer.apk_parser import APKParser

APK_PATH = "backend/uploads/F-Droid.apk"

if not os.path.exists(APK_PATH):
    print("=" * 60)
    print("APK FILE NOT FOUND")
    print("=" * 60)
    print("Expected Location:")
    print(APK_PATH)
    exit()

try:
    parser = APKParser(APK_PATH)

    print("=" * 60)
    print("APK INFORMATION")
    print("=" * 60)

    info = parser.get_basic_info()

    for key, value in info.items():
        print(f"{key}: {value}")

    print("\nPermissions:")
    for permission in parser.get_permissions():
        print(permission)

    print("\nActivities:")
    for activity in parser.get_activities():
        print(activity)

    print("\nServices:")
    for service in parser.get_services():
        print(service)

    print("\nReceivers:")
    for receiver in parser.get_receivers():
        print(receiver)

except Exception as e:
    print("\nError:")
    print(e)
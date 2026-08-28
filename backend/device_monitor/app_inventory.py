# Provides a mock inventory of apps for the device monitor since we don't have a real Android device connected.

def get_mock_inventory():
    return [
        {
            "app_name": "WhatsApp",
            "package_name": "com.whatsapp",
            "version": "2.24.10",
            "permissions": ["INTERNET", "CAMERA", "READ_CONTACTS", "RECORD_AUDIO", "READ_EXTERNAL_STORAGE"]
        },
        {
            "app_name": "Calculator",
            "package_name": "com.android.calculator2",
            "version": "1.0",
            "permissions": []
        },
        {
            "app_name": "Flashlight App Free",
            "package_name": "com.suspicious.flashlight",
            "version": "1.1",
            "permissions": ["CAMERA", "INTERNET", "READ_CONTACTS", "SEND_SMS", "RECEIVE_SMS", "READ_PHONE_STATE"]
        },
        {
            "app_name": "Banking App",
            "package_name": "com.bank.mobile",
            "version": "5.4.3",
            "permissions": ["INTERNET", "USE_FINGERPRINT", "ACCESS_NETWORK_STATE"]
        },
        {
            "app_name": "Battery Saver Pro",
            "package_name": "com.battery.saver.pro",
            "version": "2.0",
            "permissions": ["INTERNET", "KILL_BACKGROUND_PROCESSES", "SYSTEM_ALERT_WINDOW", "BIND_DEVICE_ADMIN"]
        }
    ]

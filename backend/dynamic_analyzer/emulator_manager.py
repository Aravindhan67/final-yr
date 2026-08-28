import time
import random

class EmulatorManager:
    """
    Manages the Android emulator sandbox.
    Currently uses a safe simulation mode to ensure the APK is never executed
    on the host machine.
    """
    def __init__(self, use_mock=True):
        self.use_mock = use_mock
        self.is_running = False

    def start_emulator(self):
        # In a real environment, this would start the emulator via ADB
        self.is_running = True
        return True

    def install_apk(self, apk_path):
        if not self.is_running:
            return False
        # Mock installation time
        time.sleep(0.5)
        return True

    def uninstall_apk(self, package_name):
        return True

    def stop_emulator(self):
        self.is_running = False
        return True

# License System Integration Guide

## Overview
This guide explains how to integrate the license management system with your existing trading bot application. The license system is designed to be **completely independent** and can be easily added or removed without affecting your main application.

## Files Added
```
license_manager/
├── __init__.py                 # Module initialization
├── hardware_fingerprint.py     # Hardware fingerprinting
├── license_validator.py        # License validation logic
├── license_gui.py             # PyQt5 GUI components
└── license_integration.py     # Easy integration helpers
```

## Quick Integration (Recommended)

### Method 1: Simple Check Before Startup
Add this to your `main.py` or `run.py` at the very beginning:

```python
# Add this at the top of your main.py or run.py
from license_manager.license_integration import check_license_before_startup

# Check license before starting the application
if not check_license_before_startup("Trading Bot V8"):
    sys.exit(1)

# Your existing code continues here...
```

### Method 2: Decorator Approach
Use the decorator to automatically check license:

```python
from license_manager.license_integration import integrate_license_check

@integrate_license_check
def main():
    """Your existing main function"""
    # Your existing code here...
    pass
```

## Detailed Integration

### Step 1: Add License Check to Main Entry Point

**For `main.py`:**
```python
"""
Main entry point for the trading bot application.
"""

import sys
import os
import asyncio
from pathlib import Path

# ADD THIS: License check before anything else
from license_manager.license_integration import check_license_before_startup

# Check license before starting
if not check_license_before_startup("Trading Bot V8"):
    sys.exit(1)

# Your existing imports and code continue here...
```

**For `run.py`:**
```python
"""
Script to start the trading bot application.
"""

import sys
import os

# ADD THIS: License check before anything else
from license_manager.license_integration import check_license_before_startup

# Check license before starting
if not check_license_before_startup("Trading Bot V8"):
    sys.exit(1)

# Your existing imports and code continue here...
```

### Step 2: Add License Manager to GUI (Optional)

If you want to add a license menu to your GUI, add this to your main window class:

```python
# In your gui/app.py or main window class
from license_manager.license_integration import LicenseManager

class App(QMainWindow):
    def __init__(self, bot_worker):
        super().__init__()
        # Your existing initialization...
        
        # ADD THIS: Initialize license manager
        self.license_manager = LicenseManager("Trading Bot V8")
        
        # ADD THIS: Create license menu
        self.create_license_menu()
    
    def create_license_menu(self):
        """Add license menu to menu bar"""
        menubar = self.menuBar()
        license_menu = menubar.addMenu('License')
        
        # License info action
        license_info_action = QAction('License Info', self)
        license_info_action.triggered.connect(self.show_license_info)
        license_menu.addAction(license_info_action)
        
        # Activate license action
        activate_license_action = QAction('Activate License', self)
        activate_license_action.triggered.connect(self.activate_license)
        license_menu.addAction(activate_license_action)
    
    def show_license_info(self):
        """Show current license information"""
        info = self.license_manager.get_license_info()
        QMessageBox.information(self, "License Information", 
                              f"Status: {'Valid' if info['valid'] else 'Invalid'}\n"
                              f"Message: {info['message']}")
    
    def activate_license(self):
        """Show license activation dialog"""
        self.license_manager.show_license_dialog()
```

## How the License System Works

### 1. Hardware Fingerprinting
- Generates unique hardware fingerprint using:
  - CPU ID
  - MAC Address
  - Motherboard Serial
  - Disk Serial
- Prevents license sharing between different computers

### 2. License Validation Process
1. **Online Validation**: Connects to your server to validate license
2. **Internet Required**: No offline validation since trading bot requires internet for Telegram and MT5
3. **Local Storage**: Stores license key locally for convenience

### 3. License States
- **Valid**: License is active and not expired
- **Expired**: License has passed expiration date
- **Invalid**: License key doesn't exist or hardware mismatch
- **Network Error**: Cannot connect to license server

### 4. Error Handling
- Network errors: Shows clear error message requiring internet connection
- Invalid keys: Shows clear error messages
- Hardware mismatch: Prevents license sharing

## Testing the License System

### 1. Test with Valid License
```python
from license_manager.license_validator import LicenseValidator

validator = LicenseValidator()
success, message, data = validator.validate_license("YOUR_LICENSE_KEY")
print(f"Valid: {success}, Message: {message}")
```

### 2. Test Hardware Fingerprint
```python
from license_manager.hardware_fingerprint import HardwareFingerprint

fp = HardwareFingerprint()
print(f"Fingerprint: {fp.generate_fingerprint()}")
print(f"System Info: {fp.get_system_info()}")
```

### 3. Test GUI Components
```python
from license_manager.license_gui import LicenseDialog
from PyQt5.QtWidgets import QApplication

app = QApplication([])
dialog = LicenseDialog()
dialog.show()
app.exec_()
```

## Removing the License System

To completely remove the license system:

1. **Remove the license check** from your main files:
   ```python
   # Remove these lines from main.py and run.py
   from license_manager.license_integration import check_license_before_startup
   if not check_license_before_startup("Trading Bot V8"):
       sys.exit(1)
   ```

2. **Delete the license_manager folder**:
   ```bash
   rm -rf license_manager/
   ```

3. **Remove license.json** (if it exists):
   ```bash
   rm license.json
   ```

## Configuration Options

### Disable License Checking (Development)
```python
from license_manager.license_integration import LicenseManager

license_manager = LicenseManager()
license_manager.disable_license_check()  # Disable for development
```

### Custom API URL
```python
from license_manager.license_validator import LicenseValidator

# Use custom API URL
validator = LicenseValidator(api_base_url="https://your-custom-domain.com/api/license")
```

## Troubleshooting

### Common Issues

1. **"No module named 'license_manager'"**
   - Make sure the license_manager folder is in your project root
   - Check that __init__.py exists in the license_manager folder

2. **"Network error" during validation**
   - Check internet connection
   - Verify API URL is correct
   - System will fall back to offline validation

3. **"Hardware mismatch" error**
   - License is bound to different hardware
   - Contact support to transfer license

4. **"License expired" error**
   - License has passed expiration date
   - Purchase new license or extend existing one

### Debug Mode
Enable debug logging to see detailed license validation process:

```python
import logging
logging.basicConfig(level=logging.DEBUG)

# Your license validation code here
```

## Security Features

1. **Hardware Binding**: Prevents license sharing
2. **Encrypted Storage**: License data is stored securely
3. **Online Validation**: Requires internet connection (appropriate for trading bot)
4. **Tamper Detection**: Detects if license files are modified
5. **Rate Limiting**: Prevents brute force attacks

## Support

For license-related issues:
1. Check the troubleshooting section above
2. Verify your license key is correct
3. Ensure your hardware fingerprint matches
4. Contact support with your license key and hardware fingerprint

## License Generation

To generate new licenses, use your admin API:

```bash
curl -X POST https://thedbot.com/api/license/admin/generate \
  -H "Authorization: Bearer YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"userEmail":"customer@example.com","productId":"trading-bot-pro","durationDays":365}'
```

This will return a license key that customers can use to activate your application.

# LILYGO T-Beam Setup Configuration Script

1. ## AXP2101-V1.2 Power
Upload this script below first on the onboard ESP32 before configuring the T-BEAM.
It's work is to configure the power management chip  `AXP2101` to power the GPS module.

```
#include <TinyGPS++.h>
#include <HardwareSerial.h>

TinyGPSPlus gps;  // GPS library object
HardwareSerial ss(1);  // Use HardwareSerial for UART communication

void setup() {
  Serial.begin(115200);  // Initialize serial monitor
  ss.begin(9600, SERIAL_8N1, 34, 12);  // Initialize GPS serial communication (RX, TX)

  Serial.println("GPS is starting...");
}

void loop() {
  while (ss.available() > 0) {
    gps.encode(ss.read());  // Feed the data from GPS to TinyGPS++

    if (gps.location.isUpdated()) {
      Serial.print("Latitude: ");
      Serial.println(gps.location.lat(), 6);  // Latitude with 6 decimal places
      Serial.print("Longitude: ");
      Serial.println(gps.location.lng(), 6);  // Longitude with 6 decimal places
      Serial.print("Altitude: ");
      Serial.println(gps.altitude.meters());
    }
  }
}
```


2. ## 

Supplied in the root `/` directory is a file called `/end_node_config.sh` shell script that will configure your LILYGO T-Beam device to work with this project.

Ensure the device is connected via USB and appears as a serial device.

Make sure the file is executable.

```
chmod +x end_node_config.sh
```

Run the script on the root `/` directory.

```
./end_node_config.sh
```

Supply The `device name` and `short name` when prompted. The short name cannot be more than *5* characters long.
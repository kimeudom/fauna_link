#!/bin/bash

# Make sure Meshtastic CLI is installed and the device is connected via USB
# Check if Meshtastic CLI is installed
if ! command -v meshtastic &> /dev/null
then
    echo "Meshtastic CLI could not be found. Please install it before running this script."
    exit 1
fi

# Device Name
echo "Enter name for T-Beam #$((i+1)):"
read NAME

echo "Enter short name for T-Beam #$((i+1)):"
read SHORT_NAME

# Device configs
meshtastic --set-owner "$NAME" --set-owner-short "$SHORT_NAME"

# Radio Setup
meshtastic --set lora.region "EU_868"      # Set region frequency to 868 MHz for Kenya
meshtastic --set lora.tx_power 27         # Transmission power default recommended
meshtastic --set position.gps_enabled true
meshtastic --set device.role "TRACKER"

# Power Saving
meshtastic --set power.is_power_saving true
meshtastic --set bluetooth.enabled false  # Saves power by eliminating bluetooth
meshtastic --set display.screen_on_secs 120


echo "T-Beam configured successfully with:"
echo "  Name: $NAME"
echo "  Short Name: $SHORT_NAME"
echo "  Role: TRACKER"
echo "  Power Saving Mode: Enabled"
echo "  GPS Enabled: Enabled"
echo "  LoRa TX Power: 27 dBm"
echo "  Multi-Hop Limit: 3 Hops"
echo "  Bluetooth: Disabled"
echo "  Screen Timeout: 2 minutes"
echo " ----------------------------------------------------"
echo "Configuration Complete."

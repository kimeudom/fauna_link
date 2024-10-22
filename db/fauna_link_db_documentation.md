# Fauna Link Database Schema

This documentation describes the schema for the `fauna_link` database used in a LoRa-based endangered animal tracking system. The system utilizes **TTGO T-Beam ESP32** nodes that communicate with a central Raspberry Pi, tracking animals' locations and other relevant data.

## Database: `fauna_link`

The database tracks individual animals, their location data (GPS), and other parameters like battery levels and signal strength. 

---

## Table 1: `animals`

### Purpose:
The `animals` table stores the fundamental data about each tracked animal. Each animal is identified by a unique **end_node_id** representing the LoRa-enabled GPS tracker.

### Fields:
- `id` (INT): The primary key for the table. This auto-increments and serves as a unique identifier for each animal.
- `end_node_id` (VARCHAR): A unique identifier for each animal's end node. This is the node's MAC address or LoRa Node ID. It ensures that each animal's GPS tracker can be uniquely identified.
- `name` (VARCHAR): A nickname or identifier for the animal. This field allows for easier identification of animals in reports and data views.
- `species` (VARCHAR): Optional but useful for identifying the type of animal being tracked.
- `description` (TEXT): Additional notes about the animal. This could include health status, behavior patterns, or physical descriptions.
- `date_added` (TIMESTAMP): Automatically records when the animal was added to the system for tracking. This helps track how long each animal has been monitored.

---

## Table 2: `gps_data`

### Purpose:
The `gps_data` table stores the GPS coordinates and other telemetry data sent by the LoRa nodes attached to each animal.

### Fields:
- `id` (INT): The primary key for the table. This auto-increments and serves as a unique identifier for each data entry.
- `animal_id` (INT): A foreign key that references the `id` field of the `animals` table. This creates a relationship between the animal and its GPS data.
- `latitude` (DECIMAL): Latitude of the animal's current location, accurate to 8 decimal places. 
- `longitude` (DECIMAL): Longitude of the animal's current location, accurate to 8 decimal places.
- `altitude` (DECIMAL): Altitude of the animal's location, accurate to 2 decimal places.
- `timestamp` (TIMESTAMP): Automatically records the time when the GPS data was received, allowing for historical tracking.
- `battery_level` (FLOAT): The battery level of the TTGO T-Beam device. This is important for monitoring the node's power status to ensure continuous data transmission.
- `signal_strength` (FLOAT): The Received Signal Strength Indicator (RSSI) of the LoRa signal. This helps in monitoring the signal quality between the end node and the gateway.

### Rationale:
- Storing **latitude** and **longitude** with a high degree of precision (up to 8 decimal places) ensures that the exact position of the animal can be tracked accurately.
- **Battery level** and **signal strength** are crucial for monitoring the health and connectivity of the end nodes, allowing for proactive measures in case of failures (e.g., low battery or poor signal).
- The **foreign key (animal_id)** ensures that each set of GPS data is associated with a specific animal, maintaining data integrity and ensuring easy querying based on an individual animal.

---

## Table 3: `alerts` (Optional)

### Purpose:
The `alerts` table stores alerts generated when an animal crosses predefined boundaries or other significant events occur (e.g., low battery warnings).

### Fields:
- `id` (INT): The primary key for the table. This auto-increments and serves as a unique identifier for each alert.
- `animal_id` (INT): A foreign key that references the `id` field of the `animals` table. This links the alert to a specific animal.
- `alert_type` (VARCHAR): The type of alert generated (e.g., boundary breach, low battery, loss of signal).
- `description` (TEXT): A detailed description of the alert, providing context for the event.
- `timestamp` (TIMESTAMP): Automatically records the time the alert was triggered.

### Rationale:
- This table is useful for **exception management**, allowing for the monitoring of significant events that need attention.
- Linking alerts to specific animals using the **foreign key (animal_id)** makes it easier to trace back any issues to individual animals and take action accordingly.

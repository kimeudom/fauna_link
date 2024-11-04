USE fauna_link;

-- Update latitude, longitude, and altitude in the gps_data table
UPDATE gps_data
SET latitude = -1.2724, longitude = 36.8069, altitude = 1702
WHERE animal_id = 1;

UPDATE gps_data
SET latitude = -1.2726, longitude = 36.8070, altitude = 1710
WHERE animal_id = 2;

UPDATE gps_data
SET latitude = -1.2727, longitude = 36.8068, altitude = 1695
WHERE animal_id = 3;

UPDATE gps_data
SET latitude = -1.2725, longitude = 36.8071, altitude = 1688
WHERE animal_id = 4;

UPDATE gps_data
SET latitude = -1.2730, longitude = 36.8069, altitude = 1715
WHERE animal_id = 5;

UPDATE gps_data
SET latitude = -1.2726, longitude = 36.8067, altitude = 1700
WHERE animal_id = 6;

UPDATE gps_data
SET latitude = -1.2740, longitude = 36.8080, altitude = 1690
WHERE animal_id = 7;

UPDATE gps_data
SET latitude = -1.2750, longitude = 36.8055, altitude = 1720
WHERE animal_id = 8;

UPDATE gps_data
SET latitude = -1.2735, longitude = 36.8085, altitude = 1682
WHERE animal_id = 9;

UPDATE gps_data
SET latitude = -1.2745, longitude = 36.8062, altitude = 1712
WHERE animal_id = 10;

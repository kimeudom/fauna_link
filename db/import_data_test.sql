-- Use the fauna_link database
USE fauna_link;

-- Insert data into the animals table
INSERT INTO animals (end_node_id, name, species, description) VALUES
('endnode_1', 'Simba', 'Lion', 'Tracking pride of lions'),
('endnode_2', 'Elly', 'Elephant', 'Tracking a herd of elephants'),
('endnode_3', 'Leo', 'Leopard', 'Tracking a solitary leopard'),
('endnode_4', 'Bolt', 'Cheetah', 'Tracking a fast-moving cheetah'),
('endnode_5', 'Buffy', 'Buffalo', 'Tracking a herd of buffalo'),
('endnode_6', 'Baby Dino', 'Rhinoceros', 'Tracking a solitary rhino'),
('endnode_7', 'Long Neck', 'Giraffe', 'Tracking a family of giraffes'),
('endnode_8', 'Fisi', 'Hyena', 'Tracking a pack of hyenas'),
('endnode_9', 'PundaMilia', 'Zebra', 'Tracking a herd of zebras'),
('endnode_10', 'Pumba', 'Warthog', 'Tracking a family of warthogs');

-- Insert data into the gps_data table
INSERT INTO gps_data (animal_id, latitude, longitude, altitude, battery_level, signal_strength) VALUES
(1, -1.2654, 36.8045, 1702, 92, 80),
(2, -1.2665, 36.8020, 1710, 80, 78),
(3, -1.2687, 36.8015, 1695, 87, 85),
(4, -1.2703, 36.7990, 1688, 76, 72),
(5, -1.2715, 36.8055, 1715, 94, 90),
(6, -1.2730, 36.8008, 1700, 70, 60),
(7, -1.2678, 36.8032, 1690, 89, 82),
(8, -1.2695, 36.8040, 1720, 65, 55),
(9, -1.2720, 36.8065, 1682, 85, 88),
(10, -1.2660, 36.7995, 1712, 78, 75);

-- Insert data into the alerts table
INSERT INTO alerts (animal_id, alert_type, description) VALUES
(1, 'Low Battery', 'Battery level dropped below 20%'),
(2, 'Out of Bounds', 'Animal has moved out of the designated area'),
(3, 'Low Signal', 'Signal strength below acceptable threshold'),
(4, 'Low Battery', 'Battery level dropped below 20%'),
(5, 'Out of Bounds', 'Animal has moved out of the designated area'),
(6, 'Low Battery', 'Battery level dropped below 20%'),
(7, 'Out of Bounds', 'Animal has moved out of the designated area'),
(8, 'Low Signal', 'Signal strength below acceptable threshold'),
(9, 'Low Battery', 'Battery level dropped below 20%'),
(10, 'Out of Bounds', 'Animal has moved out of the designated area');
